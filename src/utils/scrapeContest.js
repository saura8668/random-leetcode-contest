import axios from "axios";

export async function getLatestContest() {
    const query = `
      query {
        allContests {
          title
          titleSlug
          startTime
          duration
        }
      }
    `;

    try {
        const { data } = await axios.post(
            "https://leetcode.com/graphql",
            { query },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Referer": "https://leetcode.com/contest/",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
                }
            }
        );

        const contests = data?.data?.allContests || [];
        if (contests.length === 0) {
            return null;
        }

        // Pick a random contest
        const randomIndex = Math.floor(Math.random() * contests.length);
        const randomContest = contests[randomIndex];

        return {
            name: randomContest.title,
            slug: randomContest.titleSlug,
            startTime: new Date(randomContest.startTime * 1000).toISOString(),
            duration: randomContest.duration / 3600 + " hrs",
            url: `https://leetcode.com/contest/${randomContest.titleSlug}/`
        };
    } catch (err) {
        console.error("Error fetching contest:", err);
        return null;
    }
}
