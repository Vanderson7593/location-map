import { Box } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import {
  TileLayer,
  MapContainer,
  Marker,
  Popup,
  FeatureGroup,
} from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { appSelector } from "../../redux/app/app.selectors";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import { setShapes } from "../../redux/app/app.thunks";
import { IMapShape } from "@types";

const icon = L.icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

const Map: FC = () => {
  const { address } = useAppSelector(appSelector);
  const dispatch = useAppDispatch();
  // const [shapes, setShapes] = useState<Array<IMapShape>>([]);
  const coordinates = address?.coordinates;
  const fullAddress = address?.fullAddress;
  const mapRef = useRef(null);

  let shapes: Array<IMapShape> = [];

  const _onCreate = (e: any) => {
    const shape = e.layer;

    shapes = [
      ...shapes,
      {
        coordinates: shape._latlng ? [shape._latlng] : shape.latlngs,
        id: shape._leaflet_id,
      },
    ];

    dispatch(setShapes(shapes));
  };

  const _onEdit = (e: any) => {
    let editKeys = Object.keys(e.layers._layers);

    const modifiedShapes = e.layers._layers;

    const newShapes = shapes.map((shape: IMapShape) => {
      let newShape = shape;

      editKeys.forEach((key) => {
        if (shape.id === key) {
          const _shape = modifiedShapes[shape.id];
          newShape = {
            coordinates: _shape._latlng ? [_shape._latlng] : _shape.latlngs,
            id: _shape._leaflet_id,
          };
        }
      });
      return newShape;
    });
    shapes = newShapes;
    dispatch(setShapes(shapes));
  };

  const _onDelete = (e: any) => {
    let keysToDelete = Object.keys(e.layers._layers);
    const newShapes = shapes.filter(
      (shape: IMapShape) => !keysToDelete.includes(String(shape.id))
    );

    shapes = newShapes;
    dispatch(setShapes(shapes));
  };

  useEffect(() => {
    if (!mapRef.current) return;
    (mapRef.current as any)?.setView(coordinates as any, 20);
  }, [coordinates]);

  return (
    <Box width={800} height={440}>
      <MapContainer
        ref={mapRef}
        center={coordinates as any}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates as any} icon={icon}>
          <Popup>{fullAddress}</Popup>
        </Marker>
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={_onCreate}
            onEdited={_onEdit}
            onDeleted={_onDelete}
            draw={{
              rectangle: true,
              polyline: true,
              circle: true,
              circlemarker: false,
              marker: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </Box>
  );
};

export default Map;
