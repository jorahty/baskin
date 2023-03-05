import { Avatar, Box, ListItem, ListItemContent, ListItemDecorator, Typography, Stack } from '@mui/joy';
import { useAppContext } from '../../context';

import { MessageGroup } from './list';
import { SenderMessageBubble, OtherMessageBubble } from './bubble';

interface MessageCardProps {
  group: MessageGroup;
}

function SenderMessage({ group }: MessageCardProps) {
  return (
    <ListItemContent>
      <Box display="flex" justifyContent="flex-end" alignItems="end">
        <Stack direction="column" flexGrow={1} alignItems="flex-end" spacing={0.25}>
          {group.messages.map((message, i) => (
            <SenderMessageBubble key={i} message={message} />
          ))}
        </Stack>
        {/* <ListItemDecorator sx={{ justifyContent: 'flex-end' }}>
          <Avatar size="sm" src={`https://robohash.org/${group.sender}`} />
        </ListItemDecorator> */}
      </Box>
    </ListItemContent>
  );
}

function OtherMessage({ group }: MessageCardProps) {
  return (
    <ListItemContent>
      <Box display="flex" justifyContent="flex-start" alignItems="end">
        <ListItemDecorator sx={{ justifyContent: 'flex-start' }}>
          <Avatar size="sm" src={`https://robohash.org/${group.sender}`} />
        </ListItemDecorator>
        <Stack direction="column" flexGrow={1} alignItems="flex-start" spacing={0.25}>
          <Typography level="body2" sx={{ pl: 1.5 }}>
            {group.sender}
          </Typography>
          {group.messages.map((message, i) => (
            <OtherMessageBubble key={i} message={message} />
          ))}
        </Stack>
      </Box>
    </ListItemContent>
  );
}

export default function MessageCard({ group }: { group: MessageGroup }) {
  const { signedInUser } = useAppContext();

  return (
    <ListItem>
      {signedInUser?.username === group.sender ? (
        <SenderMessage group={group} />
      ) : (
        <OtherMessage group={group} />
      )}
    </ListItem>
  );
}
