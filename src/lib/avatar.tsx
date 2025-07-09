import { botttsNeutral, initials } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

interface Props {
  seed: string;
  variant: "botttsNeutral" | "initials";
}

export const generateAvatarUrl = ({ seed, variant }: Props) => {
  let avatar;
  if (variant == "botttsNeutral") {
    avatar = createAvatar(botttsNeutral, { seed });
  } else {
    avatar = createAvatar(initials, { seed, fontSize: 42, fontWeight: 500 });
  }
  return avatar.toDataUri();
};
