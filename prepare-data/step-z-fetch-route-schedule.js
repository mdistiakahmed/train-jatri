import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the routes we want to check
const paths = [
  { from: "Dhaka", to: "Brahmanbaria" },
  { from: "Brahmanbaria", to: "Dhaka" },
  // Add more routes as needed
];

// API configuration
const API_BASE_URL = 'https://railspaapi.shohoz.com/v1.0/web/bookings';
const BEARER_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJuYmYiOjE3NTE2OTMyMzAsImV4cCI6MTc1MTc3OTYzMCwiaXNzIjoiaHR0cDovL3RyYWluLWlhbS5zaG9ob3ouY29tIiwiYXVkIjoic2hvaG96LmlhbS50cmFpbiIsImNsaWVudF9pZCI6InRyYWluLXRpY2tldC11c2VyIiwiY2xpZW50X3RlbmFudF9pZCI6IjY3YTUxNjNjLTU2NWQtNGNhMC1iMTE3LTg3YzcwMWY2NTRmOSIsImNsaWVudF92ZXJ0aWNhbF9pZCI6IjA2OGU4MDRmLTJkYjctNDQ4OS05OTYzLTc4OWZiN2UwMmJkZiIsInN1YiI6ImExMWZjNjA5LTc1N2QtNDgyMy05Y2I3LWU1MjQ1NWU3OTljNSIsImF1dGhfdGltZSI6MTc1MTY5MzIzMCwiaWRwIjoibG9jYWwiLCJwaG9uZV9udW1iZXIiOiIwMTk4ODAzOTQ4MCIsImVtYWlsIjoiaXN0aW5pc2hhdEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IjAxOTg4MDM5NDgwIiwiZGlzcGxheV9uYW1lIjoiTUQuIElTVElBSyBBSE1FRCIsImxvY2FsZSI6ImJuLUJEIiwibmlkbiI6IjQyMDcyMDAyNDkiLCJuaWRudCI6Ik5JRCIsInJvbGUiOlsidXNlciIsImFub255bW91cyJdLCJzY29wZSI6WyJzaG9ob3ouaWFtLnRyYWluIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.aJE871s27Lmuf-6EatOviBvMxakF89atjl717DTbE4LgXqCK1AZHlfhgVh2Gmy4kpyLedL5zhGSqzmIXO0QPSRaQ8xqkvxsTvUq441DXfGffcvYqPjV6UCteHAI8mW2GoYCB9QgS7XfbhElEo3M4T43VXkgJ72JE-QKAxFGrDOrUYjELgYjkxtJhJRSOOUTZ8K7JVb9pPfixgTORO2SlRWYvbbhe9oLUQ3WmL_JaZh5ssXkqxp6ntHpyNTQWRm6MUWHwk_GbkmSaM7JJYNQrtSS1RtfgoNWEaQfe0PPgS6EEin8VdTgi4CBzBvJ8aG_J9R6dJ1DDesh7kOeWmm06zg'; // Replace with your actual token

// Function to format date as DD-Mon-YYYY
function formatDate(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Function to get dates for today and tomorrow
function getJourneyDates() {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return [
    { date: today, label: 'today' },
    { date: tomorrow, label: 'tomorrow' }
  ];
}

// Function to fetch train schedule
async function fetchTrainSchedule(fromCity, toCity, journeyDate) {
  try {
    const formattedDate = formatDate(journeyDate);
    const url = `${API_BASE_URL}/search-trips-v2?from_city=${encodeURIComponent(fromCity)}&to_city=${encodeURIComponent(toCity)}&date_of_journey=${formattedDate}&seat_class=S_CHAIR`;
    
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching schedule from ${fromCity} to ${toCity}:`, error.message);
    return null;
  }
}

// Function to fetch off days for a train model
async function fetchTrainOffDays(trainModel, journeyDate) {
  try {
    // Format the date as YYYY-MM-DD for the API
    const formattedDate = journeyDate.toISOString().split('T')[0];
    
    const response = await axios.post(
      'https://railspaapi.shohoz.com/v1.0/web/train-routes',
      {
        departure_date_time: formattedDate,
        model: trainModel
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Get all days of the week
    const allDays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const operatingDays = response.data.data?.days || [];
    
    // Find the off day(s)
    const offDays = allDays.filter(day => !operatingDays.includes(day.substring(0, 3)));
    
    // Format the off day string
    if (offDays.length === 0) {
      return 'No OffDay (সপ্তাহের প্রতিদিন চলে)';
    } else {
      // Map English day names to Bengali
      const dayMap = {
        'Friday': 'শুক্রবার বন্ধ',
        'Saturday': 'শনিবার বন্ধ',
        'Sunday': 'রবিবার বন্ধ',
        'Monday': 'সোমবার বন্ধ',
        'Tuesday': 'মঙ্গলবার বন্ধ',
        'Wednesday': 'বুধবার বন্ধ',
        'Thursday': 'বৃহস্পতিবার বন্ধ'
      };
      
      // Format as "Monday (সোমবার বন্ধ)" for each off day
      return offDays.map(day => `${day} (${dayMap[day]})`).join(', ');
    }
  } catch (error) {
    console.error(`Error fetching off days for model ${trainModel}:`, error.message);
    return 'Off day info not available (অফ-ডে তথ্য পাওয়া যায়নি)';
  }
}

// Function to save data to file
async function saveRouteData(fromCity, toCity, data) {
  try {
    const routesDir = path.join(__dirname, 'routes');
    await fs.mkdir(routesDir, { recursive: true });
    
    const filename = `${fromCity.toLowerCase()}_to_${toCity.toLowerCase()}.js`;
    const filePath = path.join(routesDir, filename);
    
    const fileContent = `// Auto-generated on ${new Date().toISOString()}
export const trainData = ${JSON.stringify(data, null, 2)};`;
    
    await fs.writeFile(filePath, fileContent, 'utf8');
    console.log(`✅ Saved data to ${filename}`);
  } catch (error) {
    console.error(`❌ Error saving data for ${fromCity} to ${toCity}:`, error);
  }
}

// Main function
async function main() {
  const journeyDates = getJourneyDates();
  
  for (const route of paths) {
    console.log(`\n🔍 Processing route: ${route.from} to ${route.to}`);
    
    let allSchedules = [];
    
    for (const { date, label } of journeyDates) {
      console.log(`  📅 Fetching schedule for ${label} (${formatDate(date)})...`);
      const schedule = await fetchTrainSchedule(route.from, route.to, date);
      
      if (schedule?.data?.trains) {
        // Process each train to get off day information
        for (const train of schedule.data.trains) {
          // Skip if we already have this train in our list
          if (allSchedules.some(t => t.train_model === train.train_model)) {
            continue;
          }
          
          // Get off day information for this train
          const offDay = await fetchTrainOffDays(train.train_model, date);
          
          allSchedules.push({
            train_name: train.trip_number,
            departure_date_time: train.departure_date_time.split(',')[1].trim(),
            arrival_date_time: train.arrival_date_time.split(',')[1].trim(),
            travel_time: train.travel_time,
            origin_city_name: train.origin_city_name,
            destination_city_name: train.destination_city_name,
            train_model: train.train_model,
            off_day: offDay
          });
        }
        console.log(`  ✅ Found ${allSchedules.length} unique trains so far`);
      } else {
        console.log('  ⚠️  No train data found in the response');
      }
    }
    
    if (allSchedules.length > 0) {
      // Sort by arrival time
      allSchedules.sort((a, b) => {
        // Convert time to minutes since midnight for comparison
        const getMinutes = (timeStr) => {
          const [time, period] = timeStr.split(' ');
          let [hours, minutes] = time.split(':').map(Number);
          if (period.toLowerCase() === 'pm' && hours !== 12) hours += 12;
          if (period.toLowerCase() === 'am' && hours === 12) hours = 0;
          return hours * 60 + minutes;
        };
        
        return getMinutes(a.departure_date_time) - getMinutes(b.departure_date_time);
      });
      
      await saveRouteData(route.from, route.to, allSchedules);
    } else {
      console.log(`  ❌ No schedules found for ${route.from} to ${route.to}`);
    }
  }
  
  console.log('\n🎉 All routes processed!');
}

// Run the script
main().catch(console.error);