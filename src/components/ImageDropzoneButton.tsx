import { useRef } from 'react';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { Button, Group, Text, useMantineTheme } from '@mantine/core';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import classes from './ImageDropzoneButton.module.css';
import { UUID } from 'node:crypto';

type ImageDropzoneButtonType = {
  userId: UUID
  bucketName: string
  prefixPath: string
}


export function ImageDropzoneButton(
{
  userId,
  bucketName,
  prefixPath
}: ImageDropzoneButtonType
) {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);

  const handleFileUpload = async (files: File[]) => {
    const file = files[0];

    if (file) {
      try {
        console.log('File uploaded successfully');
        console.log('userId: ', userId);
        console.log('bucketName: ', bucketName);
        console.log('prefixPath: ', prefixPath);
      } catch (err) {
        console.error('Error uploading file:', err);
      }
    }
  };

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={(files) => handleFileUpload(files)}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.svg, MIME_TYPES.gif]}
        maxSize={1.5 * 1024 ** 2}
        maxFiles={1}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconDownload size={50} color={theme.colors.blue[6]} stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload size={50} stroke={1.5} />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop image files here</Dropzone.Accept>
            <Dropzone.Reject>Only images (JPEG, PNG, SVG, GIF) under 1.5MB</Dropzone.Reject>
            <Dropzone.Idle>Upload an image</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag & drop image files here to upload. We accept only <i>.jpeg, .png, .svg, .gif</i>{' '}
            files that are less than 1.5MB.
          </Text>
        </div>
      </Dropzone>

      <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
        Select files
      </Button>
    </div>
  );
}
