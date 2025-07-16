const API_URL = import.meta.env.VITE_API_URL

export const BaseService = (resource: string) => {
  const getAll = async <T>(): Promise<T> => {
    try {
      const response = await fetch(`${API_URL}/api/${resource}/all`)
      if (!response.ok) throw new Error(`HTTP Error! status ${response.status}`)
      return await response.json()
    } catch (error) {
      console.error(`Error fetching ${resource}: `, error)
      throw error
    }
  }

  const getById = async <T>(id: number): Promise<T> => {
    try {
      const response = await fetch(`${API_URL}/api/${resource}/${id}`)
      if (!response.ok) throw new Error(`HTTP Error! status ${response.status}`)
      return await response.json()
    } catch (error) {
      console.error(`Error fetching ${resource}: `, error)
      throw error
    }
  }

  const updateObject = async <T>(id: string, object: T): Promise<T> => {
    try {
      const response = await fetch(`${API_URL}/api/${resource}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
      })
      if (!response.ok) throw new Error(`HTTP Error! status ${response.status}`)
      return await response.json()
    } catch (error) {
      console.error(`Error fetching ${resource}: `, error)
      throw error
    }
  }

  return { getAll, getById, updateObject }
}
