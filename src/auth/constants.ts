import { ConfigService } from "../config/config.service";

export const jwtConstants = {
  secret: ConfigService.getVariable('JWT_SECRET'),
  token: {
    signOptions: {
      expiresIn: "60m"
    }
  },
  refreshToken: {
    signOptions: {
      expiresIn: "120m"
    }
  }
};