export const getDataForStation = async (name: string) => {
  try {
    if (!name) {
      throw new Error(`No data file found for param: ${name}`);
    }

    let trainScheduleData;

    switch (name.toLowerCase()) {
      case "dhaka":
        trainScheduleData = await import("../data/station/dhaka/data");
        break;
      case "cumilla":
        trainScheduleData = await import("../data/station/cumilla/data");
        break;
      default:
        throw new Error(`No data file found for param: ${name}`);
    }

    return trainScheduleData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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

    let trainScheduleData: any = [];

    switch (name.toLowerCase()) {
      case "upakul-express":
        trainScheduleData = (
          await import("../data/train/dhaka-noakhali/upakul")
        ).trainData;
        break;
      case "mohanogor-provati":
        trainScheduleData = (
          await import("../data/train/dhaka-chattogram/mohanagor-provati")
        ).trainData;
        break;
      case "mohanogor-godhuli":
        trainScheduleData = (
          await import("../data/train/dhaka-chattogram/mohanagor-provati")
        ).trainData;
        break;
      case "chattala-express":
        trainScheduleData = (
          await import("../data/train/dhaka-chattogram/chattala")
        ).trainData;
        break;

      case "mohanagar-express":
        trainScheduleData = (
          await import("../data/train/dhaka-chattogram/mohanagar-express")
        ).trainData;
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
