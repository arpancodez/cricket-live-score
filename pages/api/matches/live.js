pages/api/matches/live.js  export default async function handler(req, res) {
  const sampleMatches = [
    {
      matchType: 'T20',
      title: 'India vs Australia',
      team1: 'India',
      score1: '180/5 (18.4)',
      team2: 'Australia',
      score2: '178/8 (20.0)',
      status: 'India won by 5 wickets'
    },
    {
      matchType: 'ODI',
      title: 'England vs New Zealand',
      team1: 'England',
      score1: '285/7 (50.0)',
      team2: 'New Zealand',
      score2: '220/9 (42.3)',
      status: 'New Zealand need 66 runs'
    },
    {
      matchType: 'Test',
      title: 'Pakistan vs South Africa',
      team1: 'Pakistan',
      score1: '320/10 & 145/3',
      team2: 'South Africa',
      score2: '280/10',
      status: 'Pakistan lead by 185 runs'
    }
  ]

  res.status(200).json({ matches: sampleMatches })
}
