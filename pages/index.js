import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function Home() {
  const [matches, setMatches] = useState([])
  const [upcomingMatches, setUpcomingMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedMatch, setExpandedMatch] = useState(null)

  useEffect(() => {
    fetchMatches()
    const interval = setInterval(fetchMatches, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchMatches = async () => {
    try {
      const response = await fetch('/api/matches/live')
      const data = await response.json()
      setMatches(data.data || [])
      setUpcomingMatches(data.upcoming || [])
    } catch (error) {
      console.error('Error fetching matches:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleMatchExpand = (matchId) => {
    setExpandedMatch(expandedMatch === matchId ? null : matchId)
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
            <>
              {/* Live Matches Section */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">🔴 Live Matches</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {matches.length === 0 ? (
                    <div className="col-span-full card text-center py-12">
                      <p className="text-gray-600 text-lg">No live matches at the moment</p>
                      <p className="text-gray-500 mt-2">Check back soon for live updates!</p>
                    </div>
                  ) : (
                    matches.map((match, index) => (
                      <div key={index} className="card cursor-pointer hover:shadow-xl transition-shadow" onClick={() => toggleMatchExpand(match.matchId || index)}>
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

                        {/* Expanded Scorecard */}
                        {expandedMatch === (match.matchId || index) && (
                          <div className="mt-4 pt-4 border-t-2 border-indigo-200 animate-fadeIn">
                            <div className="space-y-4">
                              {/* Batting Section */}
                              {match.batting && match.batting.length > 0 && (
                                <div>
                                  <h4 className="font-bold text-gray-700 mb-2">🏏 Batting</h4>
                                  <div className="bg-gray-50 rounded p-3 space-y-2">
                                    {match.batting.map((batsman, idx) => (
                                      <div key={idx} className="flex justify-between text-sm">
                                        <span className="font-medium">{batsman.name}</span>
                                        <span>{batsman.runs}({batsman.balls}) {batsman.fours ? `${batsman.fours}x4` : ''} {batsman.sixes ? `${batsman.sixes}x6` : ''}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Bowling Section */}
                              {match.bowling && match.bowling.length > 0 && (
                                <div>
                                  <h4 className="font-bold text-gray-700 mb-2">⚾ Bowling</h4>
                                  <div className="bg-gray-50 rounded p-3 space-y-2">
                                    {match.bowling.map((bowler, idx) => (
                                      <div key={idx} className="flex justify-between text-sm">
                                        <span className="font-medium">{bowler.name}</span>
                                        <span>{bowler.overs}O {bowler.maidens}M {bowler.runs}R {bowler.wickets}W</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Match Details */}
                              {match.venue && (
                                <div className="text-xs text-gray-500">
                                  <p>📍 {match.venue}</p>
                                  {match.date && <p>📅 {match.date}</p>}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="text-center mt-3 text-indigo-600 text-sm font-semibold">
                          {expandedMatch === (match.matchId || index) ? '▲ Click to collapse' : '▼ Click for scorecard'}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>

              {/* Upcoming Matches Section */}
              {upcomingMatches.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold text-white mb-6">📅 Upcoming Matches</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {upcomingMatches.map((match, index) => (
                      <div key={index} className="card bg-gradient-to-br from-white to-indigo-50">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-semibold text-indigo-600">{match.matchType}</span>
                          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">Upcoming</span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-800 mb-3">{match.title}</h3>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-gray-600">
                            <span className="font-medium">{match.team1}</span>
                            <span className="mx-2">vs</span>
                            <span className="font-medium">{match.team2}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-indigo-100">
                          {match.date && <p className="text-sm text-gray-600">📅 {match.date}</p>}
                          {match.venue && <p className="text-sm text-gray-600 mt-1">📍 {match.venue}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
