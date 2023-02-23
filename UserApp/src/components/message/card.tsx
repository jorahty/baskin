import { Avatar, Box, ListItem, ListItemContent, ListItemDecorator, Typography, Stack } from '@mui/joy';
import { useAppContext } from '../../context';

import { MessageGroup } from './list';

function SenderMessage({ group }: { group: MessageGroup }) {
  return (
    <ListItemContent>
      <Box display="flex" justifyContent="flex-end" alignItems="end">
        <Stack direction="column" flexGrow={1} alignItems="flex-end" spacing={0.25}>
          {group.messages.map((message, i) => (
            <Box
              key={i}
              px={1.5}
              py={0.5}
              maxWidth="75%"
              borderRadius="16px"
              bgcolor="var(--joy-palette-primary-softColor)"
            >
              <Typography key={i} sx={{ color: 'var(--joy-palette-neutral-softBg)' }}>
                {message}
              </Typography>
            </Box>
          ))}
        </Stack>
        {/* <ListItemDecorator sx={{ justifyContent: 'flex-end' }}>
          <Avatar size="sm" src={`https://robohash.org/${group.sender}`} />
        </ListItemDecorator> */}
      </Box>
    </ListItemContent>
  );
}

function OtherMessage({ group }: { group: { sender: string; messages: string[] } }) {
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
            <Box
              key={i}
              px={1.5}
              py={0.5}
              maxWidth="75%"
              borderRadius="16px"
              bgcolor="var(--joy-palette-primary-softBg)"
            >
              <Typography key={i}>{message}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </ListItemContent>
  );
}

export default function ListCard({ group }: { group: { sender: string; messages: string[] } }) {
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
