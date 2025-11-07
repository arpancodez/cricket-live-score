import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function Home() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMatches()
    const interval = setInterval(fetchMatches, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchMatches = async () => {
    try {
      const response = await fetch('/api/matches/live')
      const data = await response.json()
      setMatches(data.matches || [])
    } catch (error) {
      console.error('Error fetching matches:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Cricket Live Score - Real-time Updates</title>
        <meta name="description" content="Get live cricket scores and updates" />
      </Head>

      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              🏏 Cricket Live Score
            </h1>
            <p className="text-white text-lg opacity-90">
              Real-time cricket match updates and scores
            </p>
          </header>

          {loading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              <p className="text-white mt-4">Loading matches...</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {matches.length === 0 ? (
                <div className="col-span-full card text-center py-12">
                  <p className="text-gray-600 text-lg">No live matches at the moment</p>
                  <p className="text-gray-500 mt-2">Check back soon for live updates!</p>
                </div>
              ) : (
                matches.map((match, index) => (
                  <div key={index} className="card">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-gray-600">{match.matchType}</span>
                      <span className="live-indicator"></span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{match.title}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{match.team1}</span>
                        <span className="font-bold text-lg">{match.score1}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{match.team2}</span>
                        <span className="font-bold text-lg">{match.score2}</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">{match.status}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
