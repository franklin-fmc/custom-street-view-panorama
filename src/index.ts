/*
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable no-undef, @typescript-eslint/no-unused-vars, no-unused-vars */
import './style.css';

// @ts-nocheck TODO(jpoehnelt) remove when fixed

function initPano() {
  // Set up Street View and initially set it visible. Register the
  // custom panorama provider function. Set the StreetView to display
  // the custom panorama 'reception' which we check for below.
  const panorama = new google.maps.StreetViewPanorama(
    document.getElementById('map') as HTMLElement,
    { pano: 'reception', visible: true }
  );

  panorama.registerPanoProvider(getCustomPanorama);
}

// Return a pano image given the panoID.
function getCustomPanoramaTileUrl(
  pano: string,
  zoom: number,
  tileX: number,
  tileY: number
): string {
  return (
    'https://developers.google.com/maps/documentation/javascript/examples/full/images/' +
    'panoReception1024-' +
    zoom +
    '-' +
    tileX +
    '-' +
    tileY +
    '.jpg'
  );
}

function getCustomPanoramaTileUrl2(
  pano: string,
  zoom: number,
  tileX: number,
  tileY: number
): string {
  return 'https://img-blog.csdnimg.cn/20210324150418818' + '.jpg';
}

// Construct the appropriate StreetViewPanoramaData given
// the passed pano IDs.
function getCustomPanorama(pano: string): google.maps.StreetViewPanoramaData {
  if (pano === 'reception') {
    return {
      location: {
        pano: 'reception',
        description: 'Google Sydney - Reception',
      },
      links: [
        {
          heading: 45,
          description: 'Exit',
          pano: 'otherRoom',
        },
      ],
      // The text for the copyright control.
      copyright: 'Imagery (c) 2010 Google',
      // The definition of the tiles for this panorama.
      tiles: {
        tileSize: new google.maps.Size(1024, 512),
        worldSize: new google.maps.Size(2048, 1024),
        // The heading in degrees at the origin of the panorama
        // tile set.
        centerHeading: 105,
        getTileUrl: getCustomPanoramaTileUrl,
      },
    };
  }
  if (pano === 'otherRoom') {
    return {
      location: {
        pano: 'otherRoom',
        description: 'other room',
      },
      links: [
        {
          heading: 194,
          description: 'Back to Reception',
          pano: 'reception',
          // pano: (getCustomPanorama("reception").location as google.maps.StreetViewLocation).pano,
        },
      ],
      // The text for the copyright control.
      copyright: 'Imagery (c) 2010 Google',
      // The definition of the tiles for this panorama.
      tiles: {
        tileSize: new google.maps.Size(2048, 1024),
        worldSize: new google.maps.Size(2048, 1024),
        // The heading in degrees at the origin of the panorama
        // tile set.
        centerHeading: 105,
        getTileUrl: getCustomPanoramaTileUrl2,
      },
    };
  }
  // @ts-ignore TODO(jpoehnelt) fix typings
  return null;
}

export { initPano };
