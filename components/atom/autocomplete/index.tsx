import React, { useState, useMemo, useRef, useEffect, FC } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MuiAutocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import { useAppDispatch } from "../../../redux/hooks";
import { setAddress } from "../../../redux/app/app.thunks";
import { PlaceType } from "./types";
import { extractAddress } from "utils/extract-address";
import { IAddress } from "@types";
import { GOOGLE_API_KEY } from "constants/env";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API;

const loadScript = (src: string, position: HTMLElement | null, id: string) => {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
};

const autocompleteService = { current: null };
const geoLocationService = { current: null };

const AutoComplete: FC<{ G_API_KEY: string }> = ({ G_API_KEY }) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly PlaceType[]>([]);
  const loaded = useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetch = useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          );
        },
        200
      ),
    []
  );

  const getPlace = async (placeId: string) => {
    if (!geoLocationService.current) return { lat: 0, lng: 0 };
    const { results } = await (geoLocationService.current as any).geocode({
      placeId: placeId,
    });

    const location = results[0].geometry.location;

    const {
      postal_code: postalCode,
      locality: city,
      administrative_area_level_1: state,
      sublocality_level_1: district,
    } = extractAddress(results[0].address_components, [
      "postal_code",
      "locality",
      "administrative_area_level_1",
      "sublocality_level_1",
    ]);

    return {
      lat: location.lat() as number,
      lng: location.lng() as number,
      postalCode,
      city,
      state,
      district,
    };
  };

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
      geoLocationService.current = new (window as any).google.maps.Geocoder();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <MuiAutocomplete
      sx={{ width: 600 }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={async (event: any, newValue: PlaceType | null) => {
        if (newValue) {
          const { lat, lng, city, state, district, postalCode } =
            await getPlace(newValue?.place_id);
          dispatch(
            setAddress({
              coordinates: {
                lat,
                lng,
              },
              fullAddress: newValue.description,
              city,
              state,
              district,
              postalCode,
            })
          );
        } else {
          dispatch(setAddress(null));
        }
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Address" size="small" fullWidth />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ])
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: "text.secondary", mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default AutoComplete;
