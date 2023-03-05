import { useState } from 'react';
import { Box, Tooltip, Typography } from '@mui/joy';
import { Message } from '../../graphql/message/schema';

interface MessageBubbleProps {
  message: Message;
}

const formatDate = (timestr: string): string => {
  const date = new Date(timestr);
  const today = new Date();
  if (date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
    const [, time, ampm] = date.toLocaleString().split(' ');
    const [hour, minutes] = time.split(':');
    return `Today, ${hour}:${minutes} ${ampm}`;
  }

  const [day, time, ampm] = date.toLocaleString().split(' ');
  const [hour, minutes] = time.split(':');
  return `${day} ${hour}:${minutes} ${ampm}`;
};

export function SenderMessageBubble({ message }: MessageBubbleProps) {
  const [showDate, setShowDate] = useState(false);

  const handleHover = () => {
    setShowDate(!showDate);
  };

  return (
    <Tooltip arrow placement="bottom-end" variant="solid" size="sm" title={formatDate(message.date)}>
      <Box
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        px={1.5}
        py={0.5}
        maxWidth="70%"
        borderRadius="16px"
        bgcolor="var(--joy-palette-primary-softColor)"
      >
        <Typography sx={{ color: 'var(--joy-palette-neutral-softBg)' }}>{message.content}</Typography>
      </Box>
    </Tooltip>
  );
}

export function OtherMessageBubble({ message }: MessageBubbleProps) {
  const [showDate, setShowDate] = useState(false);

  const handleHover = () => {
    setShowDate(!showDate);
  };

  return (
    <Tooltip arrow placement="bottom-start" variant="solid" size="sm" title={formatDate(message.date)}>
      <Box
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        px={1.5}
        py={0.5}
        maxWidth="70%"
        borderRadius="16px"
        bgcolor="var(--joy-palette-primary-softBg)"
      >
        <Typography>{message.content}</Typography>
      </Box>
    </Tooltip>
  );
}
