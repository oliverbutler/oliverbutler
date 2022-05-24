import { NextApiResponse } from 'next'
import useSWR, { SWRConfiguration } from 'swr'

export enum ApiRoute {
  SCORE_HIGH = '/api/score/high',
  SCORE_MY = '/api/score/my',
}

export type BaseAPIRequest<TQuery extends Record<string, string>, TBody, TSuccess, Terror> = {
  query: TQuery
  body: TBody
  success: TSuccess
  error: Terror
}

export type APIResponse<TSuccess, Terror> = BaseAPIRequest<never, never, TSuccess, Terror>
export type APIResponseWithQuery<
  TQuery extends Record<string, string>,
  TSuccess,
  Terror
> = BaseAPIRequest<TQuery, never, TSuccess, Terror>
export type APIResponseWithBody<TBody, TSuccess, Terror> = BaseAPIRequest<
  never,
  TBody,
  TSuccess,
  Terror
>

export type ApplicationError = {
  name: string
}

export type ApiEndpoint = {
  path: string
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const fetcher = (url) => fetch(url).then((res) => res.json())

export const useQuery = <T extends BaseAPIRequest<any, unknown, unknown, unknown>>(
  apiRoute: ApiRoute,
  config?: {
    options?: SWRConfiguration<T['success'], T['error']>
    query?: T['query']
    body?: T['body']
  }
) => {
  const queryString = config?.query
    ? Object.keys(config.query)
        .map((key) => key + '=' + (config.query?.[key] ?? ''))
        .join('&')
    : ''

  const url = `${baseUrl}${apiRoute}${queryString ? '?' + queryString : ''}`

  const swr = useSWR<T['success'], T['error']>(url, fetcher, config?.options)

  return swr
}

export const apiRequest = async <T extends BaseAPIRequest<any, unknown, unknown, unknown>>(
  type: 'post',
  apiRoute: ApiRoute,
  body: T['body']
): Promise<{ data: T['success'] }> => {
  const url = `${baseUrl}${apiRoute}`

  const data = await fetch(url, {
    method: type,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json())

  return { data }
}

export const apiResponse = <T extends BaseAPIRequest<any, unknown, unknown, unknown>>(
  res: NextApiResponse,
  data: T['success'],
  status?: number
) => {
  return res.status(status ?? 200).json(data)
}

export const apiError = <T extends BaseAPIRequest<any, unknown, unknown, unknown>>(
  res: NextApiResponse,
  error: T['error'],
  status?: number
) => {
  return res.status(status ?? 400).json(error)
}
