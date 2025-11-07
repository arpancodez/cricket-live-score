// API route to fetch live cricket match data
// Supports both Cricket API and fallback sample data

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
              matchType: match.matchType || 'Live',
              title: match.name || 'Match',
              team1: match.teams?.[0] || match.teamInfo?.[0]?.name || 'Team 1',
              score1: match.score?.[0]?.inning || 'N/A',
              team2: match.teams?.[1] || match.teamInfo?.[1]?.name || 'Team 2',
              score2: match.score?.[1]?.inning || 'N/A',
              status: match.status || 'Live',
              matchId: match.id,
              venue: match.venue || '',
              date: match.dateTimeGMT || '',
            }));
          
          // Return live matches if found
          if (liveMatches.length > 0) {
            return res.status(200).json({
              success: true,
              data: liveMatches,
              timestamp: new Date().toISOString(),
              source: 'live-api'
            });
          }
        }
      } catch (apiError) {
        console.error('Cricket API Error:', apiError);
        // Fall through to sample data
      }
    }
    
    // Fallback: Return sample data with India A vs Australia A
    const sampleMatches = [
      {
        matchType: 'List A',
        title: 'India A vs Australia A',
        team1: 'India A',
        score1: '245/6 (45.2)',
        team2: 'Australia A', 
        score2: '198/8 (40.0)',
        status: 'India A won by 47 runs',
        matchId: 'ind-a-vs-aus-a-2025',
        venue: 'MCG, Melbourne',
        date: new Date().toISOString(),
      },
      {
        matchType: 'T20',
        title: 'India vs South Africa',
        team1: 'India',
        score1: '185/5 (20.0)',
        team2: 'South Africa',
        score2: '178/7 (20.0)',
        status: 'India won by 7 runs',
        matchId: 'ind-vs-sa-t20-2025',
        venue: 'Wanderers, Johannesburg',
        date: new Date().toISOString(),
      },
      {
        matchType: 'ODI',
        title: 'England vs New Zealand',
        team1: 'England',
        score1: '285/7 (50.0)',
        team2: 'New Zealand',
        score2: '220/9 (42.3)',
        status: 'New Zealand need 66 runs',
        matchId: 'eng-vs-nz-odi-2025',
        venue: 'Lord\'s, London',
        date: new Date().toISOString(),
      },
    ];
    
    res.status(200).json({
      success: true,
      data: sampleMatches,
      timestamp: new Date().toISOString(),
      source: 'sample-data',
      message: 'Add CRICKET_API_KEY to environment variables for live data'
    });
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch match data',
      message: error.message
    });
  }
}
