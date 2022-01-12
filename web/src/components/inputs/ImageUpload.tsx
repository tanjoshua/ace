import { FormControl, Image } from "@chakra-ui/react";
import { useField } from "formik";
import React, { useRef, useState } from "react";

interface Props {
  name: string;
}

const ImageUpload = ({ ...props }: Props) => {
  const [field, { error }, helpers] = useField(props);
  const { setValue } = helpers;

  const imageInputRef = useRef(null);
  const [profile, setProfile] = useState(null);

  const handleImageUpload = (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setValue(reader.result);
      setProfile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <FormControl>
      <input
        type="file"
        ref={imageInputRef}
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      <Image
        borderRadius="full"
        boxSize="150px"
        src={
          profile ||
          "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
        }
        alt="Profile Picture"
        onClick={() => imageInputRef.current.click()}
      />
    </FormControl>
  );
};

export default ImageUpload;
