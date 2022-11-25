import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import UploadIcon from '@mui/icons-material/Upload';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

export default function UploadButton() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label"
      sx={{
        backgroundColor: "navy",
        fontFamily: "arial"
      }}
      >
      <UploadIcon sx={{fontSize: "medium"}} /> &nbsp; Upload
        <input hidden accept="image/*" multiple type="file" />
      </Button>
    </Stack>
  );
}
