import { useAppContext } from '../../context';
import { Chat } from '@/graphql/chat/schema';
import { Avatar, Box, List, ListItem, ListItemButton, Badge, Stack, Typography } from '@mui/joy';
import Router from 'next/router';

interface Props {
  chats: Chat[];
  selectedChat: undefined | Chat;
}

export default function ChatList({ chats, selectedChat }: Props) {
  const { signedInUser } = useAppContext();

  function renderChatName(chat: Chat) {
    if (chat.name) return chat.name; // chat already has a name

    // get array of other members (remove the signed-in user from chat members array)
    const otherMembers = chat.members.filter(member => member.username !== signedInUser?.username);

    // if there is only one other chat member, render their full name
    if (otherMembers.length === 1) return otherMembers[0].name;

    // else, render comma-seperated list of first names
    return otherMembers.map(member => member.name.split(' ')[0]).join(', ');
  }

  return (
    <List sx={{ p: 0, width: 240 }}>
      {chats.map(chat => {
        const otherMembers = chat.members.filter(member => member.username !== signedInUser?.username);
        console.log(otherMembers);

        return (
          <ListItem key={chat.id} sx={{ py: 1.5 }}>
            <ListItemButton
              selected={chat.id === selectedChat?.id}
              variant={chat.id === selectedChat?.id ? 'soft' : 'plain'}
              onClick={() => Router.push(`/messages/${chat.id}`, undefined, { shallow: true })}
            >
              <Stack direction="row" spacing={1.8} alignItems="center">
                <Box>
                  {otherMembers.length - 1 ? (
                    <Badge
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <Avatar sx={{ '--Avatar-size': '20px' }} size="sm">
                          <Typography level="body3" textColor="common.black">{`+${
                            otherMembers.length - 1
                          }`}</Typography>
                        </Avatar>
                      }
                      badgeInset="14%"
                      sx={{
                        '--Badge-paddingX': '0px',
                      }}
                      size="sm"
                    >
                      <Avatar size="sm" src={`https://robohash.org/${otherMembers[0].username}`} />
                    </Badge>
                  ) : (
                    <Avatar size="sm" src={`https://robohash.org/${otherMembers[0].username}`} />
                  )}
                </Box>
                <Typography>{renderChatName(chat)}</Typography>
              </Stack>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
