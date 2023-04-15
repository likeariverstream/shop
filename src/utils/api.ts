export const url = 'https://app.aaccent.su/js/confirm.php'

export type Request = {
    method?: string,
    headers: {
      'Content-Type': string,
    },
    body: string
  }

export const request = async (url: string, options?: Request): Promise<unknown> => {
    const res = await fetch(url, options)
    return checkResponse(res)
}

const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
}
