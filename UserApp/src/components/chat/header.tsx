import { useAppContext } from '../../context';
import { Chat } from '../../graphql/chat/schema';
import { Avatar, AvatarGroup, Stack, Typography } from '@mui/joy';

export default function ChatHeader({ chat }: { chat: Chat | undefined }) {
  const { signedInUser } = useAppContext();

  function renderChatName(chat: Chat) {
    if (!chat) return undefined;
    if (chat.name) return chat.name; // chat already has a name

    // get array of other members (remove the signed-in user from chat members array)
    const otherMembers = chat.members.filter(member => member.username !== signedInUser?.username);

    // if there is only one other chat member, render their full name
    if (otherMembers.length === 1) return otherMembers[0].name;

    // else, render comma-seperated list of first names
    return otherMembers.map(member => member.name?.split(' ')[0]).join(', ');
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      height="70px"
      spacing={2}
      p={2}
      bgcolor="background.surface"
      role="chat-header"
    >
      <AvatarGroup>
        {chat?.members.map((member, i) => member.username === signedInUser?.username ? (
          <></>
        ) : (
          <Avatar key={i} src={`https://robohash.org/${member.username}`} />
        )
        )}
      </AvatarGroup>
      <Typography>{renderChatName(chat as Chat)}</Typography>
    </Stack>
  );
}
