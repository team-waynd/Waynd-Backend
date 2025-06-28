import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {}
