import { useAppContext } from '../../context';
import { Chat } from '@/graphql/chat/schema';
import { Avatar, ListItem, ListItemButton, Badge, Stack, Typography } from '@mui/joy';
import Router from 'next/router';

interface Props {
  chat: Chat;
  selected: boolean;
}

export default function ChatCard({ chat, selected }: Props) {
  const { signedInUser } = useAppContext();

  // get array of other members (remove the signed-in user from chat members array)
  const otherMembers = chat.members.filter(member => member.username !== signedInUser?.username);

  function renderChatName(chat: Chat) {
    if (chat.name) return chat.name; // chat already has a name

    // if there is only one other chat member, render their full name
    if (otherMembers.length === 1) return otherMembers[0].name;

    // else, render comma-seperated list of first names
    return otherMembers.map(member => member.name?.split(' ')[0]).join(', ');
  }

  return (
    <ListItem key={chat.id}>
      <ListItemButton
        selected={selected}
        variant={selected ? 'soft' : 'plain'}
        onClick={() => Router.push(`/messages/${chat.id}`, undefined, { shallow: true })}
      >
        <Stack direction="row" alignItems="center" py={1} gap={2}>
          {otherMembers.length - 1 ? (
            <Badge
              size="sm"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeInset="14%"
              sx={{
                '--joy-palette-primary-solidBg': 'var(--joy-palette-neutral-softBg)',
              }}
              badgeContent={
                <Typography level="body3" textColor="text.primary" fontWeight="xl">
                  +{otherMembers.length - 1}
                </Typography>
              }
            >
              <Avatar size="sm" src={`https://robohash.org/${otherMembers[0].username}`} />
            </Badge>
          ) : (
            <Avatar size="sm" src={`https://robohash.org/${otherMembers[0].username}`} />
          )}
          <Typography>{renderChatName(chat)}</Typography>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}
