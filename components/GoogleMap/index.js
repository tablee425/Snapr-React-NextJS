import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import './styles.css';

const MyGoogleMap = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDW3GBMDFSZoV-NEsb4fT8r4vEewgZVMTo',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div className="detail-map" />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: this.props.address }, (results, status) => {
        if (status === 'OK') {
          this.setState({
            center: { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() },
          });
        } else {
          // console.log(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    },
  }),
)(props => (
  <GoogleMap zoom={14} center={props.center}>
    <Marker position={props.center} />
  </GoogleMap>
));

export default MyGoogleMap;
