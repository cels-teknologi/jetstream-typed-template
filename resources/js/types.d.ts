type Numberish = bigint | number | string;
type Dateable = Date | string;

type EnumExample = import('@/enumerations/EnumExample').EnumExample;

interface Model {
  [key: string]: unknown;
}

interface Timestamped {
  created_at: Dateable;
  updated_at: Dateable;
}

interface Membership extends Model, Timestamped {
  role: string;
}

interface Team extends Model, Timestamped {
  id: Numberish;
  user_id: Numberish;

  name: string;
  personal_team: boolean;
  created_at: Dateable;
  updated_at: Dateable;

  owner?: User;
  users?: (User & { membership: Membership })[];
}

interface User extends Model, Timestamped {
  id: Numberish;
  current_team_id: Numberish;

  name: string;
  email: string;
  profile_photo_path?: string;
  profile_photo_url: string;

  email_verified_at?: Dateable;
  two_factor_confirmed_at?: Dateable;

  current_team?: Team;
  all_teams?: Team[];
}
