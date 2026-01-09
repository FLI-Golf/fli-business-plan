import PocketBase from 'pocketbase';
import dotenv from 'dotenv';

dotenv.config();

const pb = new PocketBase('https://few-likely.pockethost.io');

const globalViewerData = [
  {
    name: "Global Disc Golf Overview",
    description: `
      <h2>📈 Sport Growth Trends</h2>
      <ul>
        <li>Disc golf continues rapid global growth, with <strong>16,000+ courses worldwide</strong> as of 2025. Course count has more than doubled since 2017.</li>
        <li>Disc golf infrastructure is a strong proxy for participation and organized play, showing the sport's viability across regions and continents.</li>
        <li>UDisc reports <strong>20+ million rounds</strong> and <strong>1.26 million active users globally</strong>, illustrating broad engagement beyond formal league play.</li>
        <li>This underscores the global footprint of disc golf and its potential as a digitally consumable sport.</li>
      </ul>
    `,
    order: 1
  },
  {
    name: "Participation & Course Footprint by Country",
    description: `
      <p>Below are the key markets for FLI Golf distribution:</p>
      
      <h3>🇺🇸 United States</h3>
      <ul>
        <li><strong>Disc golf domination:</strong> The U.S. leads the world in total rounds played and courses. In 2024 there were <strong>~13.7 million UDisc-recorded rounds</strong> in the U.S., dwarfing other countries.</li>
        <li>The U.S. has a massive player base with the most courses (<strong>10,000+</strong>), providing a large domestic viewer base.</li>
        <li><strong>Viewer implication:</strong> The U.S. remains the primary broadcast and streaming market for disc golf viewership. Local leagues, PDGA majors, and UDisc coverage already create compelling content pipelines.</li>
      </ul>
      
      <h3>🇫🇮 Finland</h3>
      <ul>
        <li>Disc golf has <strong>high participation per capita</strong>, second only to countries like Norway in rounds per 1,000 residents — significantly ahead of the U.S. on a per-person basis.</li>
        <li><strong>~1,082 courses</strong> and strong community infrastructure make Finland one of Europe's most mature disc golf markets.</li>
        <li><strong>Viewer implication:</strong> Finland's unique position — with a dedicated course network and high per-capita participation — suggests strong potential for European viewership, especially for major events and player-focused broadcasts.</li>
      </ul>
      
      <h3>🇸🇪 Sweden</h3>
      <ul>
        <li>Swedish players recorded <strong>~1.28 million rounds in 2024</strong>, placing them among the top international disc golf markets in volume.</li>
        <li>Sweden ranks high in both course availability and play frequency relative to population, making it a strong secondary European market.</li>
        <li><strong>Viewer implication:</strong> Sweden's large engaged base makes it a key European hub for streaming and localized broadcast content.</li>
      </ul>
      
      <h3>🇩🇰 Denmark</h3>
      <ul>
        <li>Danish players recorded <strong>~348,000 rounds in 2024</strong>, and course access is broad, with consistent growth.</li>
        <li>Danish PDGA membership and UDisc metrics, while smaller compared to Nordics like Sweden or Finland, still reflect deep engagement relative to population.</li>
        <li><strong>Viewer implication:</strong> Denmark complements Nordic regional viewership, particularly in combined European content syndication (e.g., Nordic disc golf championships or joint league exposure).</li>
      </ul>
      
      <h3>🇪🇪 Estonia</h3>
      <ul>
        <li>Estonia's UDisc-recorded rounds (<strong>~89,000 in 2024</strong>) and rapidly growing registered player base illustrate strong local community growth for such a smaller population.</li>
        <li>Estonia also ranks well in courses per capita, making the sport accessible in local regions.</li>
        <li><strong>Viewer implication:</strong> While smaller total audience size, Estonia's dense player penetration and proximity to Nordic disc golf hubs makes it a strategic European test market for content outreach and cross-border viewer growth.</li>
      </ul>
    `,
    order: 2
  },
  {
    name: "Participation Numbers & Engagement Estimates",
    description: `
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f3f4f6; border-bottom: 2px solid #e5e7eb;">
            <th style="padding: 12px; text-align: left; color: #000;">Country</th>
            <th style="padding: 12px; text-align: center; color: #000;">UDisc-Recorded Rounds (2024)</th>
            <th style="padding: 12px; text-align: center; color: #000;">Approx. Courses</th>
            <th style="padding: 12px; text-align: center; color: #000;">Relative Engagement</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">United States</td>
            <td style="padding: 12px; text-align: center;">~13.7M</td>
            <td style="padding: 12px; text-align: center;">10,000+</td>
            <td style="padding: 12px; text-align: center;">Very High</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">Sweden</td>
            <td style="padding: 12px; text-align: center;">~1.28M</td>
            <td style="padding: 12px; text-align: center;">~732</td>
            <td style="padding: 12px; text-align: center;">High</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">Finland</td>
            <td style="padding: 12px; text-align: center;">~786K</td>
            <td style="padding: 12px; text-align: center;">~1,082</td>
            <td style="padding: 12px; text-align: center;">Very High per capita</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">Denmark</td>
            <td style="padding: 12px; text-align: center;">~348K</td>
            <td style="padding: 12px; text-align: center;">~187</td>
            <td style="padding: 12px; text-align: center;">Moderate</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">Estonia</td>
            <td style="padding: 12px; text-align: center;">~89K</td>
            <td style="padding: 12px; text-align: center;">~204</td>
            <td style="padding: 12px; text-align: center;">Strong per capita</td>
          </tr>
        </tbody>
      </table>
      
      <p>These figures don't reflect formal broadcast viewers yet but represent an engaged participation foundation that can be translated into total potential viewership.</p>
    `,
    order: 3
  },
  {
    name: "Estimated Viewer Opportunity",
    description: `
      <p>We can reasonably extrapolate viewership potential based on participation-to-viewer ratios seen in other niche sports (e.g., ultimate, e-sports, disc golf events).</p>
      
      <h3>Conservative Engagement Funnel (Example)</h3>
      <ul>
        <li><strong>Active Players → Interested Viewers:</strong> ~5–10× players (Fans who watch but don't play)</li>
        <li><strong>Participation Viewers → Casual Viewers:</strong> 1–2× players (Friends, families, social viewers)</li>
        <li><strong>Regional/National Coverage Reach:</strong> Broadcast adds significant scale</li>
      </ul>
      
      <h3>Applying these to your markets:</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f3f4f6; border-bottom: 2px solid #e5e7eb;">
            <th style="padding: 12px; text-align: left; color: #000;">Market</th>
            <th style="padding: 12px; text-align: center; color: #000;">Estimated Active Engagement Base</th>
            <th style="padding: 12px; text-align: center; color: #000;">Projected Viewer Reach</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">US</td>
            <td style="padding: 12px; text-align: center;">Millions of players + rounds</td>
            <td style="padding: 12px; text-align: center;">Multi-millions (TV/streaming)</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">Finland</td>
            <td style="padding: 12px; text-align: center;">500K–800K total engagement</td>
            <td style="padding: 12px; text-align: center;">2M+ potential viewers</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">Sweden</td>
            <td style="padding: 12px; text-align: center;">800K–1.3M engagement</td>
            <td style="padding: 12px; text-align: center;">2–3M potential viewers</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">Denmark</td>
            <td style="padding: 12px; text-align: center;">~300K engagement</td>
            <td style="padding: 12px; text-align: center;">800K–1.2M viewers</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">Estonia</td>
            <td style="padding: 12px; text-align: center;">~90K rounds / growing</td>
            <td style="padding: 12px; text-align: center;">300K–500K viewers</td>
          </tr>
        </tbody>
      </table>
      
      <p><em>Note: These are directional projections grounded in global participation data and comparisons to viewership metrics for comparable recreational-to-broadcast converted sports (disc golf majors, PDGA Champs, etc.).</em></p>
    `,
    order: 4
  },
  {
    name: "Strategic Implications for FLI Golf Distribution",
    description: `
      <h3>🇺🇸 United States</h3>
      <ul>
        <li>Primary broadcast target</li>
        <li>Largest participation and course density</li>
        <li>Major sponsors and content platforms converge here</li>
      </ul>
      
      <h3>🌍 Scandinavian & Baltic Region (Finland, Sweden, Denmark, Estonia)</h3>
      <ul>
        <li>High per-capita engagement and growth</li>
        <li>Leverage Nordic partnerships for regional streaming deals</li>
        <li>Tailor content to localized languages and athletes</li>
      </ul>
    `,
    order: 5
  },
  {
    name: "Key Takeaways",
    description: `
      <ul>
        <li>Disc golf's U.S. participation dominates in raw numbers, but Nordic countries exhibit high per-capita engagement and accessibility.</li>
        <li>These markets collectively offer a <strong>multi-million viewer opportunity</strong> given structured distribution, commentary, and event packaging.</li>
        <li>International viewership will likely come from:
          <ul>
            <li>Live event broadcasts</li>
            <li>Highlight packages</li>
            <li>Localized lifestyle and player story content</li>
          </ul>
        </li>
      </ul>
    `,
    order: 6
  },
  {
    name: "Projected Viewership by Market",
    description: `
      <p>Below are data-grounded viewership projections for a major broadcast of FLI Golf events, based on:</p>
      <ul>
        <li>Actual PDGA broadcast reported numbers</li>
        <li>Population and participation pull</li>
        <li>Interest ratios seen in similar niche sports events</li>
      </ul>
      <p>These are conservative to realistic — not wild guesses.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f3f4f6; border-bottom: 2px solid #e5e7eb;">
            <th style="padding: 12px; text-align: left; color: #000;">Country</th>
            <th style="padding: 12px; text-align: center; color: #000;">Population</th>
            <th style="padding: 12px; text-align: center; color: #000;">Estimated Viewers per Event</th>
            <th style="padding: 12px; text-align: left; color: #000;">Basis</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">🇺🇸 United States</td>
            <td style="padding: 12px; text-align: center;">~345M</td>
            <td style="padding: 12px; text-align: center;">500,000 – 1,200,000</td>
            <td style="padding: 12px;">U.S. is largest disc golf market; strong streaming + social distribution potential</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">🇫🇮 Finland</td>
            <td style="padding: 12px; text-align: center;">~5.6M</td>
            <td style="padding: 12px; text-align: center;">400,000 – 800,000</td>
            <td style="padding: 12px;">Benchmark PDGA Worlds broadcast reached ~1M+ in 2025 in Finland alone; scaled for FLI Golf</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">🇸🇪 Sweden</td>
            <td style="padding: 12px; text-align: center;">~10.6M</td>
            <td style="padding: 12px; text-align: center;">300,000 – 600,000</td>
            <td style="padding: 12px;">High rounds-per-capita; second-largest Nordic player base</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">🇩🇰 Denmark</td>
            <td style="padding: 12px; text-align: center;">~6.0M</td>
            <td style="padding: 12px; text-align: center;">150,000 – 350,000</td>
            <td style="padding: 12px;">Lower UDisc rounds but solid course access and engagement per capita</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">🇪🇪 Estonia</td>
            <td style="padding: 12px; text-align: center;">~1.36M</td>
            <td style="padding: 12px; text-align: center;">50,000 – 120,000</td>
            <td style="padding: 12px;">Small population but very high participation penetration for disc golf</td>
          </tr>
        </tbody>
      </table>
      
      <p><strong>Global total per major event broadcast: 👉 1.4M – 3.1M viewers across these five countries</strong></p>
      
      <p>These estimates are annual event targets — actual numbers will vary by:</p>
      <ul>
        <li>broadcast quality</li>
        <li>platform availability</li>
        <li>live vs recorded viewership</li>
        <li>social amplification</li>
      </ul>
    `,
    order: 7
  },
  {
    name: "Why These Estimates Are Credible",
    description: `
      <h3>🇺🇸 United States</h3>
      <ul>
        <li>Largest player base — 10,000+ courses, tens of millions of rounds.</li>
        <li>Even niche sports like professional disc golf attract 500K+ live views on streaming when promoted.</li>
        <li>With YouTube + TikTok highlight distribution, total reach easily breaks seven figures for marquee events.</li>
      </ul>
      
      <h3>🇫🇮 Finland</h3>
      <ul>
        <li>PDGA World Championships in Finland (non-major commercial sport event) hit <strong>~1.35M broadcast viewers</strong>.</li>
        <li>FLI Golf, especially if localized (Finnish commentary + marketing), can leverage national sports enthusiasm.</li>
      </ul>
      
      <h3>🇸🇪 Sweden</h3>
      <ul>
        <li>Sweden ranks high in overall UDisc rounds per population.</li>
        <li>Professional disc golf leagues (e.g., SDGPT) show emerging broadcast interest — a ready audience exists.</li>
      </ul>
      
      <h3>🇩🇰 Denmark & 🇪🇪 Estonia</h3>
      <ul>
        <li>Smaller populations but with high course access per capita and strong participation penetration.</li>
        <li>Estonia in particular has very high local participation ratios relative to population.</li>
        <li>These markets are leveraged better via regional Nordic distribution partners and cross‑promo with local organizations.</li>
      </ul>
    `,
    order: 8
  }
];

async function addGlobalViewerData() {
  try {
    console.log('🔄 Starting to add global viewer data...');
    
    // Authenticate as admin
    console.log('🔐 Authenticating as admin...');
    await pb.admins.authWithPassword(
      process.env.POCKETBASE_ADMIN_EMAIL,
      process.env.POCKETBASE_ADMIN_PASSWORD
    );
    console.log('✅ Authenticated successfully!');
    
    console.log('📊 Checking existing records...');
    
    const existing = await pb.collection('global_viewer').getList(1, 50);
    console.log(`Current global_viewer count: ${existing.totalItems}`);
    
    if (existing.totalItems > 0) {
      console.log('🗑️  Deleting existing records to update...');
      for (const record of existing.items) {
        await pb.collection('global_viewer').delete(record.id);
        console.log(`   Deleted: ${record.name}`);
      }
    }
    
    for (const viewer of globalViewerData) {
      const record = await pb.collection('global_viewer').create(viewer);
      console.log(`✅ Added: ${viewer.name} (ID: ${record.id})`);
    }
    
    console.log('✅ All global viewer data added successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
  }
}

addGlobalViewerData();
