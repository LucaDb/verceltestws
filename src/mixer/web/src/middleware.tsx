
import { routeInterceptor } from '@websolutespa/bom-mixer-models';
import { isApiRequest, isNextRequest, isStaticRequest } from '@websolutespa/bom-mixer-store';
import { NextFetchEvent, NextResponse } from 'next/server';

export async function middleware(request: NextRequest, next: NextFetchEvent) {
  /*
   * Skipping static requests
  */
  if (isStaticRequest(request)) {
    NextResponse.next();
    return;
  }

  /*
   * Checking for next private requests
  */
  if (isNextRequest(request)) {
    NextResponse.next();
    return;
  }

  if (isApiRequest(request)) {
    NextResponse.next();
    return;
  }
  /*
    * Resolving CMS routes
  */
  return await routeInterceptor(request, next);
}
