import { trainData as aghnibina_express } from "@/data/train/aghnibina_express";
import { trainData as banalata_express } from "@/data/train/banalata_express";
import { trainData as banglabandha_express } from "@/data/train/banglabandha_express";
import { trainData as barendra_express } from "@/data/train/barendra_express";
import { trainData as benapole_express } from "@/data/train/benapole_express";
import { trainData as bhrammaputra_express } from "@/data/train/bhrammaputra_express";
import { trainData as bijoy_express } from "@/data/train/bijoy_express";
import { trainData as burimari_commuter } from "@/data/train/burimari_commuter";
import { trainData as burimari_express } from "@/data/train/burimari_express";
import { trainData as chapainawabganj_shuttle } from "@/data/train/chapainawabganj_shuttle";
import { trainData as chattala_express } from "@/data/train/chattala_express";
import { trainData as chilahati_express } from "@/data/train/chilahati_express";
import { trainData as chitra_express } from "@/data/train/chitra_express";
import { trainData as coxs_bazar_express } from "@/data/train/coxs_bazar_express";
import { trainData as dhalarchar_express } from "@/data/train/dhalarchar_express";
import { trainData as dhumketu_express } from "@/data/train/dhumketu_express";
import { trainData as dolonchapa_express } from "@/data/train/dolonchapa_express";
import { trainData as drutojan_express } from "@/data/train/drutojan_express";
import { trainData as egarosindhur_godhuli } from "@/data/train/egarosindhur_godhuli";
import { trainData as egarosindhur_provati } from "@/data/train/egarosindhur_provati";
import { trainData as ekota_express } from "@/data/train/ekota_express";
import { trainData as hawr_express } from "@/data/train/hawr_express";
import { trainData as jahanabad_express } from "@/data/train/jahanabad_express";
import { trainData as jamalpur_express } from "@/data/train/jamalpur_express";
import { trainData as jamuna_express } from "@/data/train/jamuna_express";
import { trainData as jayentika_express } from "@/data/train/jayentika_express";
import { trainData as kalni_express } from "@/data/train/kalni_express";
import { trainData as kanchon_intercity_commuter } from "@/data/train/kanchon_intercity_commuter";
import { trainData as kapotaksha_express } from "@/data/train/kapotaksha_express";
import { trainData as kishorganj_express } from "@/data/train/kishorganj_express";
import { trainData as korotoa_express } from "@/data/train/korotoa_express";
import { trainData as kurigram_express } from "@/data/train/kurigram_express";
import { trainData as lalmoni_commuter } from "@/data/train/lalmoni_commuter";
import { trainData as lalmoni_express } from "@/data/train/lalmoni_express";
import { trainData as madhumati_express } from "@/data/train/madhumati_express";
import { trainData as meghna_express } from "@/data/train/meghna_express";
import { trainData as mohanagar_express } from "@/data/train/mohanagar_express";
import { trainData as mohonganj_express } from "@/data/train/mohonganj_express";
import { trainData as nilsagar_express } from "@/data/train/nilsagar_express";
import { trainData as padma_express } from "@/data/train/padma_express";
import { trainData as paharika_express } from "@/data/train/paharika_express";
import { trainData as panchagarh_express } from "@/data/train/panchagarh_express";
import { trainData as parabat_express } from "@/data/train/parabat_express";
import { trainData as parjotak_express } from "@/data/train/parjotak_express";
import { trainData as probal_express } from "@/data/train/probal_express";
import { trainData as rangpur_express } from "@/data/train/rangpur_express";
import { trainData as ruposhi_bangla_express } from "@/data/train/ruposhi_bangla_express";
import { trainData as rupsha_express } from "@/data/train/rupsha_express";
import { trainData as sagardari_express } from "@/data/train/sagardari_express";
import { trainData as shaikat_express } from "@/data/train/shaikat_express";
import { trainData as silkcity_express } from "@/data/train/silkcity_express";
import { trainData as simanta_express } from "@/data/train/simanta_express";
import { trainData as sirajganj_express } from "@/data/train/sirajganj_express";
import { trainData as sonar_bangla_express } from "@/data/train/sonar_bangla_express";
import { trainData as suborno_express } from "@/data/train/suborno_express";
import { trainData as sundarban_express } from "@/data/train/sundarban_express";
import { trainData as tista_express } from "@/data/train/tista_express";
import { trainData as titumir_express } from "@/data/train/titumir_express";
import { trainData as tungipara_express } from "@/data/train/tungipara_express";
import { trainData as turna } from "@/data/train/turna";
import { trainData as udayan_express } from "@/data/train/udayan_express";
import { trainData as upaban_express } from "@/data/train/upaban_express";
import { trainData as upakul_express } from "@/data/train/upakul_express";

export const getDataForStation = async (name: string) => {
  try {
    if (!name) {
        throw new Error(`No train name provided`);
    }
      const fileName = name; // normalize: "Upakul Express" → "upukulexpress"

      const { trainData } = await import(`../data/Stations/${fileName}.js`);

      console.log(trainData);

      return trainData;
  } catch (error) {
      console.error(`Failed to load train data for: ${name}`);
    throw error;
  }
};

// export const getDataForStation = async (name: string) => {
//   try {
//     if (!name) {
//       throw new Error(`No data file found for param: ${name}`);
//     }

//     let trainScheduleData;

//     switch (name.toLowerCase()) {
//       case "dhaka":
//         trainScheduleData = await import("../data/station/dhaka/data");
//         break;
//       case "cumilla":
//         trainScheduleData = await import("../data/station/cumilla/data");
//         break;
//       default:
//         throw new Error(`No data file found for param: ${name}`);
//     }

//     return trainScheduleData;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export const getDataForRoute = async (route: string) => {
  try {
    if (!route) {
      throw new Error(`No data file found for param: ${route}`);
    }

    let trainScheduleData: any = [];

    switch (route.toLowerCase()) {
      case "dhaka-to-brahmanbaria":
        trainScheduleData = await import(
          "../data/route/dhaka-to-brahmanbaria/data"
        );
        break;
      case "brahmanbaria-to-dhaka":
        trainScheduleData = await import(
          "../data/route/brahmanbaria-to-dhaka/data"
        );
        break;
      case "dhaka-to-narshindi":
        trainScheduleData = await import(
          "../data/route/dhaka-to-narshindi/data"
        );
        break;
      default:
        break;
    }

    return trainScheduleData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDataForTrain = async (name: string) => {
  try {
    if (!name) {
      throw new Error(`No data file found for param: ${name}`);
    }

    let trainScheduleData: any = null; // Initialize to null
    const fileName = name.replace(/-/g, "_");

    // Use a switch statement to return the correct data based on the file name
    switch (fileName) {
      case 'aghnibina_express':
        trainScheduleData = aghnibina_express;
        break;
      case 'banalata_express':
        trainScheduleData = banalata_express;
        break;
      case 'banglabandha_express':
        trainScheduleData = banglabandha_express;
        break;
      case 'barendra_express':
        trainScheduleData = barendra_express;
        break;
      case 'benapole_express':
        trainScheduleData = benapole_express;
        break;
      case 'bhrammaputra_express':
        trainScheduleData = bhrammaputra_express;
        break;
      case 'bijoy_express':
        trainScheduleData = bijoy_express;
        break;
      case 'burimari_commuter':
        trainScheduleData = burimari_commuter;
        break;
      case 'burimari_express':
        trainScheduleData = burimari_express;
        break;
      case 'chapainawabganj_shuttle':
        trainScheduleData = chapainawabganj_shuttle;
        break;
      case 'chattala_express':
        trainScheduleData = chattala_express;
        break;
      case 'chilahati_express':
        trainScheduleData = chilahati_express;
        break;
      case 'chitra_express':
        trainScheduleData = chitra_express;
        break;
      case 'coxs_bazar_express':
        trainScheduleData = coxs_bazar_express;
        break;
      case 'dhalarchar_express':
        trainScheduleData = dhalarchar_express;
        break;
      case 'dhumketu_express':
        trainScheduleData = dhumketu_express;
        break;
      case 'dolonchapa_express':
        trainScheduleData = dolonchapa_express;
        break;
      case 'drutojan_express':
        trainScheduleData = drutojan_express;
        break;
      case 'egarosindhur_godhuli':
        trainScheduleData = egarosindhur_godhuli;
        break;
      case 'egarosindhur_provati':
        trainScheduleData = egarosindhur_provati;
        break;
      case 'ekota_express':
        trainScheduleData = ekota_express;
        break;
      case 'hawr_express':
        trainScheduleData = hawr_express;
        break;
      case 'jahanabad_express':
        trainScheduleData = jahanabad_express;
        break;
      case 'jamalpur_express':
        trainScheduleData = jamalpur_express;
        break;
      case 'jamuna_express':
        trainScheduleData = jamuna_express;
        break;
      case 'jayentika_express':
        trainScheduleData = jayentika_express;
        break;
      case 'kalni_express':
        trainScheduleData = kalni_express;
        break;
      case 'kanchon_intercity_commuter':
        trainScheduleData = kanchon_intercity_commuter;
        break;
      case 'kapotaksha_express':
        trainScheduleData = kapotaksha_express;
        break;
      case 'kishorganj_express':
        trainScheduleData = kishorganj_express;
        break;
      case 'korotoa_express':
        trainScheduleData = korotoa_express;
        break;
      case 'kurigram_express':
        trainScheduleData = kurigram_express;
        break;
      case 'lalmoni_commuter':
        trainScheduleData = lalmoni_commuter;
        break;
      case 'lalmoni_express':
        trainScheduleData = lalmoni_express;
        break;
      case 'madhumati_express':
        trainScheduleData = madhumati_express;
        break;
      case 'meghna_express':
        trainScheduleData = meghna_express;
        break;
      case 'mohanagar_express':
        trainScheduleData = mohanagar_express;
        break;
      case 'mohonganj_express':
        trainScheduleData = mohonganj_express;
        break;
      case 'nilsagar_express':
        trainScheduleData = nilsagar_express;
        break;
      case 'padma_express':
        trainScheduleData = padma_express;
        break;
      case 'paharika_express':
        trainScheduleData = paharika_express;
        break;
      case 'panchagarh_express':
        trainScheduleData = panchagarh_express;
        break;
      case 'parabat_express':
        trainScheduleData = parabat_express;
        break;
      case 'parjotak_express':
        trainScheduleData = parjotak_express;
        break;
      case 'probal_express':
        trainScheduleData = probal_express;
        break;
      case 'rangpur_express':
        trainScheduleData = rangpur_express;
        break;
      case 'ruposhi_bangla_express':
        trainScheduleData = ruposhi_bangla_express;
        break;
      case 'rupsha_express':
        trainScheduleData = rupsha_express;
        break;
      case 'sagardari_express':
        trainScheduleData = sagardari_express;
        break;
      case 'shaikat_express':
        trainScheduleData = shaikat_express;
        break;
      case 'silkcity_express':
        trainScheduleData = silkcity_express;
        break;
      case 'simanta_express':
        trainScheduleData = simanta_express;
        break;
      case 'sirajganj_express':
        trainScheduleData = sirajganj_express;
        break;
      case 'sonar_bangla_express':
        trainScheduleData = sonar_bangla_express;
        break;
      case 'suborno_express':
        trainScheduleData = suborno_express;
        break;
      case 'sundarban_express':
        trainScheduleData = sundarban_express;
        break;
      case 'tista_express':
        trainScheduleData = tista_express;
        break;
      case 'titumir_express':
        trainScheduleData = titumir_express;
        break;
      case 'tungipara_express':
        trainScheduleData = tungipara_express;
        break;
      case 'turna':
        trainScheduleData = turna;
        break;
      case 'udayan_express':
        trainScheduleData = udayan_express;
        break;
      case 'upaban_express':
        trainScheduleData = upaban_express;
        break;
      case 'upakul_express':
        trainScheduleData = upakul_express;
        break;
      default:
        throw new Error(`No data found for train: ${name}`);
    }

    return trainScheduleData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};