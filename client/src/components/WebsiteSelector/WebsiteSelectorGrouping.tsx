import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Grid } from "@material-ui/core";
import { createRowObjects } from "../../firebase/firestore";
import {
  WebsiteJointDataMap,
  SelectedWebsites,
  WebsiteJointData,
} from "../../interfaces";
import WebsiteSelect from "./WebsiteSelector";
import { useLocation } from "react-router";

const WebsiteSelectorGrouping = ({
  webisteJointData,
  setSelectedWebsites,
  selectedWebsites,
}: {
  webisteJointData: WebsiteJointDataMap;
  setSelectedWebsites: Dispatch<SetStateAction<SelectedWebsites>>;
  selectedWebsites: SelectedWebsites;
}) => {
  const [webisteDataInRows, setWebisteDataInRows] = useState<
    WebsiteJointData[][]
  >([[], [], []]);

  const returnUpdateFunction = useCallback(
    (index: number) => {
      const updateNameAndUrl = (index: number, name: string) => {
        console.log(selectedWebsites);
        const namesCopy = [...selectedWebsites.names];
        const linksCopy = [...selectedWebsites.links];
        namesCopy[index] = name;
        console.log(name, "NAZWA");
        linksCopy[index] = webisteJointData[name].url;
        const res = {
          ...selectedWebsites,
          links: linksCopy,
          names: namesCopy,
        };
        console.log(res);
        setSelectedWebsites(res);
      };

      const updateShow = (index: number, show: boolean) => {
        const showCopy = [...selectedWebsites.show];
        showCopy[index] = show;
        console.log(showCopy, "kopia");
        const res = {
          ...selectedWebsites,
          show: showCopy,
        };

        setSelectedWebsites(res);
      };

      const x = (data: boolean | string) => {
        if (typeof data === "string") {
          updateNameAndUrl(index, data);
        } else {
          updateShow(index, data);
        }
        console.log("updated", selectedWebsites, data, index);
      };
      return x;
    },
    [webisteJointData, selectedWebsites, setSelectedWebsites]
  );

  // inital setting

  useEffect(() => {
    console.log(webisteJointData, "sprawdz");
    if (Object.keys(webisteJointData).length > 0) {
      console.log(webisteJointData, "przeszlo");
      const politicsBasedOnRows = createRowObjects(webisteJointData);
      console.log(politicsBasedOnRows, "rowy");
      setWebisteDataInRows(politicsBasedOnRows);
    }
  }, [webisteJointData]);

  useEffect(() => {
    if (
      selectedWebsites.names[0] === "" &&
      webisteDataInRows[0].length > 0 &&
      Object.keys(webisteJointData).length > 0
    ) {
      const res: SelectedWebsites = {
        names: [],
        links: [],
        show: [true, true, true],
      };
      const keys = Object.keys(webisteDataInRows);
      keys.forEach((key, index) => {
        // const key =
        const data = webisteDataInRows[index][0];
        console.log(data, "klucze");
        res.names.push(data.name);
        res.links.push(data.url);
      });
      setSelectedWebsites(res);
    }
  }, [webisteDataInRows, setSelectedWebsites, webisteJointData]);
  let location = useLocation();

  return (
    <>
    <Grid
      container
      direction="row"
      alignItems="center"
      className="website-selector--wrapper"
      justifyContent="center"
    >
      {webisteDataInRows[0].length !== 0
        ? webisteDataInRows.map((item, index) => {
            return (
              <WebsiteSelect
                websiteSelectData={item}
                updateFunction={returnUpdateFunction(index)}
              />
            );
          })
        : null}

  
    </Grid>
        {location.pathname !== "/words" && webisteDataInRows[0].length !== 0 ? (
          <p className="date-group--date-selector-text">Toggle visibility of webiste data</p>
        ) : null}
    </>
  );
};

export default WebsiteSelectorGrouping;
