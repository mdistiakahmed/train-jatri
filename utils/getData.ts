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

      return trainData;
  } catch (error) {
      console.error(`Failed to load train data for: ${name}`);
    throw error;
  }
};


export const getDataForRoute = async (route: string) => {
  try {
    if (!route) {
      throw new Error(`No route provided`);
    }

    // Convert route to match file name format (e.g., 'dhaka-to-brahmanbaria' -> 'dhaka_to_brahmanbaria')
    const fileName = route.toLowerCase().replace(/-/g, '_');
    
    try {
      // Use dynamic import with template literals
      const module = await import(`@/data/routes/${fileName}.js`);
      return { trainData: module.trainData };
    } catch (importError) {
      console.error(`Failed to import route data for ${route}:`, importError);
      throw new Error(`No data found for route: ${route}`);
    }
  } catch (error) {
    console.error('Error in getDataForRoute:', error);
    throw error;
  }
};

export const getDataForTrain = async (name: string) => {
  try {
    if (!name) {
      throw new Error(`No data file found for param: ${name}`);
    }

    const fileName = name.replace(/-/g, "_");

      console.log(fileName);

      const { trainData } = await import(`../data/train/${fileName}.js`);

      return trainData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};