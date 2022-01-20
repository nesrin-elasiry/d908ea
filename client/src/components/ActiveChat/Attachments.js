import React from "react";
import { Box } from "@material-ui/core";

const Attachments = (props) => {
  const { attachments } = props;

  return (
      <>
      {attachments &&
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            marginBottom: '5px',
          }}
        >
        {attachments.map((image, index) => (
            <Box
              component="img"
              sx={{
                height: 80,
                width: 80,
                marginRight: '5px',
                borderRadius: '5px',
              }}
              alt={image}
              src={image}
            />
          ))}
      </Box>
    }
    </>
  );
};

export default Attachments;
