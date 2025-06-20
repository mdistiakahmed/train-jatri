import fs from "fs";
import path from "path";
import { pathToFileURL } from "url"; // Import pathToFileURL
import { fileURLToPath } from 'url';

async function combineTrainData() {
  const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
  const trainDetailsDir = path.join(__dirname, 'train_details');
  const finalTrainDataDir = path.join(__dirname, 'Final_train_data');

  if (!fs.existsSync(finalTrainDataDir)) {
    fs.mkdirSync(finalTrainDataDir);
  }

  const files = fs.readdirSync(trainDetailsDir);
  const trainMap = {};

  files.forEach((file) => {
    const match = file.match(/(.*)_(\d+)\.js/);
    if (match) {
      const trainName = match[1];
      if (!trainMap[trainName]) {
        trainMap[trainName] = [];
      }
      trainMap[trainName].push(file);
    }
  });

  for (const trainName in trainMap) {
    if (trainMap[trainName].length === 2) {
      const file1 = trainMap[trainName][0];
      const file2 = trainMap[trainName][1];

      const filePath1 = path.join(trainDetailsDir, file1);
      const filePath2 = path.join(trainDetailsDir, file2);

      try {
        // Convert file paths to file:// URLs
        const fileUrl1 = pathToFileURL(filePath1).toString();
        const fileUrl2 = pathToFileURL(filePath2).toString();

        const data1 = await import(fileUrl1);
        const data2 = await import(fileUrl2);

        const trainData = {
          forward: data1.trainRouteData,
          reverse: data2.trainRouteData,
        };

        const outputFileName = `${trainName}.js`;
        const outputFilePath = path.join(finalTrainDataDir, outputFileName);
        const outputContent = `export const trainData = ${JSON.stringify(
          trainData,
          null,
          2
        )};`;

        fs.writeFileSync(outputFilePath, outputContent);
        console.log(
          `Combined data for ${trainName} saved to ${outputFileName}`
        );
      } catch (error) {
        console.error(`Error processing ${trainName}:`, error);
      }
    } else {
      console.log(`Skipping ${trainName}: Incorrect number of files.`);
    }
  }
}

combineTrainData();
