import path from 'path';
import fs from 'fs';
import { fireEvent, screen } from '@testing-library/react';

export async function addImage(imageName: string, imageType: string) {
  // Adding image
  const imagePathName = path.resolve(__dirname, '../../') + `/images/${imageName}`;
  const imageContent = fs.readFileSync(imagePathName);
  const blob = new Blob([imageContent], { type: `image/${imageType}` });
  const file = new File([blob], imageName, { type: `image/${imageType}` });

  // Get the input button
  const input = screen.getByLabelText('add product image');

  // mock for URL.createObjectURL
  Object.defineProperty(window.URL, 'createObjectURL', {
    value: jest.fn().mockReturnValue(imagePathName),
    configurable: true,
  });

  fireEvent.change(input, { target: { files: [file] } });
  // delete window.URL.createObjectURL;
}
