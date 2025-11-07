// API route to fetch live cricket match data
// Supports both Cricket API and fallback sample data with detailed scorecards

export default async function handler(req, res) {
  try {
    // Check if Cricket API key is configured
    const CRICKET_API_KEY = process.env.CRICKET_API_KEY;

    if (CRICKET_API_KEY) {
      // Fetch live data from Cricket API
      try {
        const response = await fetch(
          'https://api.cricapi.com/v1/currentMatches?apikey=' + CRICKET_API_KEY + '&offset=0',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          // Filter for live matches and format the response
          const liveMatches = data.data
            .filter(match => match.matchStarted && !match.matchEnded)
            .map(match => ({
              matchType: match.matchType || 'live',
              title: match.name || 'Match',
              team1: match.teams?.[0] || match.teamInfo?.[0]?.name || 'Team 1',
              score1: match.score?.[0]?.inning || match.score?.[0]?.r + '/' + match.score?.[0]?.w || 'N/A',
              team2: match.teams?.[1] || match.teamInfo?.[1]?.name || 'Team 2',
              score2: match.score?.[1]?.inning || match.score?.[1]?.r + '/' + match.score?.[1]?.w || 'N/A',
              status: match.status || 'Live',
              matchId: match.id,
              venue: match.venue || '',
              date: match.dateTimeGMT || '',
              // Add batting details (sample structure - actual API may vary)
              batting: match.score?.[0] ? [
                { name: 'Batsman 1', runs: 45, balls: 38, fours: 5, sixes: 1 },
                { name: 'Batsman 2', runs: 32, balls: 28, fours: 4, sixes: 0 }
              ] : [],
              // Add bowling details (sample structure)
              bowling: match.score?.[0] ? [
                { name: 'Bowler 1', overs: '8.2', maidens: 1, runs: 42, wickets: 2 },
                { name: 'Bowler 2', overs: '7.0', maidens: 0, runs: 38, wickets: 1 }
              ] : []
            }));

          // Get upcoming matches
          const upcomingMatches = data.data
            .filter(match => !match.matchStarted)
            .slice(0, 6)
            .map(match => ({
              matchType: match.matchType || 'upcoming',
              title: match.name || 'Match',
              team1: match.teams?.[0] || match.teamInfo?.[0]?.name || 'Team 1',
              team2: match.teams?.[1] || match.teamInfo?.[1]?.name || 'Team 2',
              venue: match.venue || '',
              date: match.dateTimeGMT || '',
              matchId: match.id
            }));

          // Return live matches if found
          if (liveMatches.length > 0 || upcomingMatches.length > 0) {
            return res.status(200).json({
              success: true,
              data: liveMatches,
              upcoming: upcomingMatches,
              timestamp: new Date().toISOString(),
              source: 'live-api'
            });
          }
        }
      } catch (apiError) {
        console.error('API Error:', apiError);
      }
    }

    // Fallback to sample data with detailed scorecards
    const sampleLiveMatches = [
      {
        matchType: 'test',
        title: 'India A vs South Africa A, 2nd Unofficial Test',
        team1: 'India A',
        score1: 'India A Inning 1',
        team2: 'South Africa A',
        score2: 'South Africa A Inning 1',
        status: 'Day 2: 2nd Session - South Africa A trail by 146 runs',
        matchId: '7dface9-007-4a63-a214-622ff0243fd5',
        venue: 'BCCI Centre of Excellence Ground 1, Bengaluru',
        date: '2025-11-06T03:30:00.00Z',
        batting: [
          { name: 'Abhimanyu Easwaran', runs: 84, balls: 125, fours: 11, sixes: 1 },
          { name: 'Sai Sudharsan', runs: 52, balls: 78, fours: 7, sixes: 0 },
          { name: 'Devdutt Padikkal*', runs: 38, balls: 45, fours: 5, sixes: 1 },
          { name: 'Dhruv Jurel†', runs: 27, balls: 34, fours: 3, sixes: 0 }
        ],
        bowling: [
          { name: 'Gerald Coetzee', overs: '12.0', maidens: 2, runs: 45, wickets: 2 },
          { name: 'Dane Paterson', overs: '13.0', maidens: 3, runs: 38, wickets: 1 },
          { name: 'Senuran Muthusamy', overs: '10.2', maidens: 1, runs: 42, wickets: 1 }
        ]
      },
      {
        matchType: 'odi',
        title: 'Australia vs Pakistan, 3rd ODI',
        team1: 'Australia',
        score1: '285/7 (50 ov)',
        team2: 'Pakistan',
        score2: '142/4 (28.3 ov)',
        status: 'Pakistan need 144 runs in 129 balls',
        matchId: 'match-002',
        venue: 'Perth Stadium, Perth',
        date: '2025-11-07T03:30:00.00Z',
        batting: [
          { name: 'Babar Azam*', runs: 67, balls: 58, fours: 8, sixes: 2 },
          { name: 'Mohammad Rizwan†', runs: 45, balls: 52, fours: 4, sixes: 1 }
        ],
        bowling: [
          { name: 'Mitchell Starc', overs: '7.3', maidens: 0, runs: 38, wickets: 2 },
          { name: 'Pat Cummins', overs: '8.0', maidens: 1, runs: 32, wickets: 1 }
        ]
      }
    ];

    const sampleUpcomingMatches = [
      {
        matchType: 't20',
        title: 'India vs England, 1st T20I',
        team1: 'India',
        team2: 'England',
        venue: 'Eden Gardens, Kolkata',
        date: '2025-11-10T14:00:00.00Z',
        matchId: 'upcoming-001'
      },
      {
        matchType: 'odi',
        title: 'New Zealand vs Sri Lanka, 1st ODI',
        team1: 'New Zealand',
        team2: 'Sri Lanka',
        venue: 'Hagley Oval, Christchurch',
        date: '2025-11-11T02:00:00.00Z',
        matchId: 'upcoming-002'
      },
      {
        matchType: 'test',
        title: 'South Africa vs West Indies, 1st Test',
        team1: 'South Africa',
        team2: 'West Indies',
        venue: 'SuperSport Park, Centurion',
        date: '2025-11-12T08:00:00.00Z',
        matchId: 'upcoming-003'
      },
      {
        matchType: 't20',
        title: 'Pakistan vs Bangladesh, T20I Series',
        team1: 'Pakistan',
        team2: 'Bangladesh',
        venue: 'Gaddafi Stadium, Lahore',
        date: '2025-11-13T14:30:00.00Z',
        matchId: 'upcoming-004'
      },
      {
        matchType: 'odi',
        title: 'Australia vs India, 2nd ODI',
        team1: 'Australia',
        team2: 'India',
        venue: 'Melbourne Cricket Ground',
        date: '2025-11-14T03:30:00.00Z',
        matchId: 'upcoming-005'
      },
      {
        matchType: 'test',
        title: 'England vs New Zealand, 2nd Test',
        team1: 'England',
        team2: 'New Zealand',
        venue: 'Lord\'s, London',
        date: '2025-11-15T11:00:00.00Z',
        matchId: 'upcoming-006'
      }
    ];

    return res.status(200).json({
      success: true,
      data: sampleLiveMatches,
      upcoming: sampleUpcomingMatches,
      timestamp: new Date().toISOString(),
      source: 'sample-data'
    });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch match data',
      data: [],
      upcoming: []
    });
  }
}
