const API_URL = import.meta.env.VITE_API_URL

export const JobService = () => {
  const updateAll = async (): Promise<void> => {
    const apiString = `${API_URL}/api/job/update-all`
    try {
      const response = await fetch(apiString, {
        method: 'POST',
        headers: { ContentType: 'application/json' },
        body: JSON.stringify({ data: 'test' }),
      })
      if (!response.ok) throw new Error(`HTTP Error! status ${response.status}`)
    } catch (error) {
      console.error(`Error fetching resource ${apiString}`, error)
    }
  }

  // const testUpdateAll = async (): Promise<void> => {
  //   const apiString = `${API_URL}/api/job/test`
  //   try {
  //     const response = await fetch(apiString, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     if (!response.ok) throw new Error(`HTTP Error! status ${response.status}`)
  //   } catch (error) {
  //     console.error(`Error fetching resource ${apiString}`, error)
  //   }
  // }

  return { updateAll /*testUpdateAll*/ }
}
