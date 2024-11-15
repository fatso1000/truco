export interface IMeta {
  deck: ICard[];
  playerCards: ICard[];
  rivalCards: ICard[];
  tableCards: ITableCard[][];
  mano: boolean;
  round: number;
  turn: number;
}

export interface ITableCard {
  card: ICard;
  player: "player" | "rival";
  round: number;
  status: "waiting" | "win" | "lose";
}

export interface ICard {
  name: string;
  image: string;
  value: number;
}

export enum EnumStates {
  PLAYING = "PLAYING",
  SHUFFLING = "SHUFFLING",
  WAITING = "WAITING",
  WAITING_TRUCO = "WAITING_TRUCO",
  WAITING_RETRUCO = "WAITING_RETRUCO",
  WAITING_VALE_CUATRO = "WAITING_VALE_CUATRO",
}

export interface ITrucoMeta {
  level:
    | null
    | TrucoActions.TRUCO
    | TrucoActions.RETRUCO
    | TrucoActions.VALE_CUATRO;
  points: number;
  lastTrucoPlayer: string | undefined;
}

export enum TrucoActions {
  TRUCO = "Truco",
  RETRUCO = "Retruco",
  VALE_CUATRO = "Vale cuatro",
  QUIERO = "Quiero",
  NO_QUIERO = "No quiero",
  QUIERO_RETRUCO = "Quiero retruco",
  QUIERO_VALE_CUATRO = "Quiero vale cuatro",
  ENVIDO = "Envido",
}

export interface PlayMenuProps {
  yourTurn: boolean;
  trucoMeta: ITrucoMeta;
  onTrucoPlay: (
    type: TrucoActions.TRUCO | TrucoActions.RETRUCO | TrucoActions.VALE_CUATRO
  ) => void;
  onTrucoReply: (
    answer: TrucoActions.QUIERO | TrucoActions.NO_QUIERO | TrucoActions.ENVIDO
  ) => void;
  state: EnumStates;
  trucoTurn: string | undefined;
  onMazo: () => void;
}

export interface AlertProps {
  alertMessage: string;
  alertType: string;
  isAlertVisible: boolean;
}