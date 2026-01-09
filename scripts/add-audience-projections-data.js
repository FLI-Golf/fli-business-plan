import PocketBase from 'pocketbase';
import dotenv from 'dotenv';

dotenv.config();

const pb = new PocketBase('https://few-likely.pockethost.io');

const audienceProjectionsData = [
  {
    name: "Purpose of This Report",
    description: `
      <p>This report outlines a defensible, assumption-based fan attendance model for the FLI Golf League inaugural event at Turf Paradise. The goal is to demonstrate how projected attendance is grounded in:</p>
      <ul>
        <li>Venue realities</li>
        <li>Event format</li>
        <li>Local and regional population data</li>
        <li>Active disc golf participation</li>
        <li>Youth, school, and college feeder audiences</li>
      </ul>
      <p>This report is designed to support investor diligence, sponsorship sales, and internal operational planning.</p>
    `,
    order: 1
  },
  {
    name: "Venue & Event Format Overview",
    description: `
      <h2>Venue: Turf Paradise (Phoenix, AZ)</h2>
      
      <h3>Key Characteristics</h3>
      <ul>
        <li>Large grandstand seating</li>
        <li>Expansive infield suitable for temporary stadium-style course construction</li>
        <li>Existing infrastructure for:
          <ul>
            <li>Alcohol sales</li>
            <li>Food vendors</li>
            <li>Security and crowd flow</li>
            <li>Large-scale public events</li>
          </ul>
        </li>
      </ul>
      
      <h3>Event Format Assumptions</h3>
      <ul>
        <li>Festival-style, continuous-entry event</li>
        <li>Fans attend for 2–4 hour windows rather than the full day</li>
        <li>Peak on-site attendance is lower than total daily gate</li>
        <li>Event includes:
          <ul>
            <li>Competitive play</li>
            <li>Music and entertainment</li>
            <li>Sponsor activations</li>
            <li>Food and alcohol</li>
          </ul>
        </li>
      </ul>
      
      <h3>Key Framing Principle</h3>
      <p><strong>Total attendance reflects through-the-gate foot traffic, not simultaneous seated capacity.</strong></p>
    `,
    order: 2
  },
  {
    name: "Attendance Scenarios",
    description: `
      <h2>Top-Level Summary</h2>
      <p>FLI Golf attendance is modeled across three scenarios to ensure conservative forecasting while clearly defining upside potential.</p>
      
      <h3>Scenario Overview</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f3f4f6; border-bottom: 2px solid #e5e7eb;">
            <th style="padding: 12px; text-align: left; color: #000;">Scenario</th>
            <th style="padding: 12px; text-align: center; color: #000;">Peak On-Site Attendance</th>
            <th style="padding: 12px; text-align: center; color: #000;">Total Daily Gate</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;"><strong>Conservative</strong></td>
            <td style="padding: 12px; text-align: center;">1,400 – 1,800</td>
            <td style="padding: 12px; text-align: center;">2,500 – 3,500</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;"><strong>Expected</strong></td>
            <td style="padding: 12px; text-align: center;">3,000 – 3,800</td>
            <td style="padding: 12px; text-align: center;">6,500 – 8,500</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;"><strong>Best Case</strong></td>
            <td style="padding: 12px; text-align: center;">4,500 – 6,000</td>
            <td style="padding: 12px; text-align: center;">10,000 – 15,000</td>
          </tr>
        </tbody>
      </table>
    `,
    order: 3
  },
  {
    name: "Local Market Catchment",
    description: `
      <h2>2-Hour Travel Radius</h2>
      
      <h3>Geographic Assumption</h3>
      <ul>
        <li>Active disc golf fans routinely travel up to 2 hours for high-quality events</li>
        <li>Turf Paradise sits within the core of the Phoenix metropolitan region</li>
      </ul>
      
      <h3>Population Base</h3>
      <p><strong>Approximate population within 2-hour radius: ~5,000,000 residents</strong></p>
      
      <p>This establishes a large, accessible audience base without requiring overnight travel or destination-level commitment.</p>
    `,
    order: 4
  },
  {
    name: "Active Disc Golf Audience",
    description: `
      <h2>UDisc-Aligned Analysis</h2>
      
      <h3>Key Behavioral Insight</h3>
      <ul>
        <li>Disc golf players demonstrate high travel willingness for unique or elite events</li>
        <li>UDisc data consistently shows players traveling significant distances for competitive and showcase tournaments</li>
      </ul>
      
      <h3>Regional Participation Assumption</h3>
      <p><strong>Estimated ~40,000 active disc golf players within a 2-hour radius</strong></p>
      <ul>
        <li>Includes UDisc-tracked users</li>
        <li>Includes non-tracked casual and league players</li>
      </ul>
      
      <h3>Role in Attendance Model</h3>
      <p>Disc golfers form a reliable foundation, not the entirety, of event attendance.</p>
      <p>This group supplies:</p>
      <ul>
        <li>Early ticket buyers</li>
        <li>Word-of-mouth marketing</li>
        <li>Core atmosphere and credibility</li>
      </ul>
    `,
    order: 5
  },
  {
    name: "Youth & School-Based Feeder Audiences",
    description: `
      <h2>Middle School & High School Students</h2>
      <ul>
        <li>Phoenix metro contains hundreds of middle and high schools</li>
        <li>Disc golf participation is increasing through:
          <ul>
            <li>Physical education programs</li>
            <li>School clubs</li>
            <li>Youth leagues</li>
          </ul>
        </li>
      </ul>
      
      <h3>Impact on Attendance</h3>
      <p>Students attend with:</p>
      <ul>
        <li>Parents</li>
        <li>Siblings</li>
        <li>School groups</li>
      </ul>
      <p><strong>This creates multi-ticket household attendance, not single-ticket behavior</strong></p>
    `,
    order: 6
  },
  {
    name: "Colleges & Universities",
    description: `
      <h2>Local Higher Education Footprint</h2>
      <ul>
        <li>Arizona State University (multiple campuses)</li>
        <li>University of Arizona (regional draw)</li>
        <li>Northern Arizona University (regional draw)</li>
        <li>Maricopa County Community College District</li>
      </ul>
      
      <h3>Combined Enrollment</h3>
      <p><strong>Universities + Community Colleges: 300,000+ students in the broader region</strong></p>
      
      <h3>Why This Matters</h3>
      <p>College students are:</p>
      <ul>
        <li>Highly mobile</li>
        <li>Price-sensitive but volume-driven</li>
        <li>Strongly influenced by social and entertainment elements</li>
      </ul>
      
      <p>This demographic aligns directly with FLI Golf's:</p>
      <ul>
        <li>Music</li>
        <li>Festival environment</li>
        <li>Social media-driven brand</li>
      </ul>
    `,
    order: 7
  },
  {
    name: "Local Market Funnel",
    description: `
      <h2>Best-Case Illustration</h2>
      <p>The following funnel demonstrates how modest conversion rates support the upper-end attendance scenario.</p>
      
      <h3>Market Funnel Layers</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px; font-weight: bold; color: #fff;">2-Hour Radius Population</td>
            <td style="padding: 12px; text-align: right; color: #fff;">~5,000,000</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px; font-weight: bold; color: #fff;">Active Disc Golf Players</td>
            <td style="padding: 12px; text-align: right; color: #fff;">~40,000</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px; font-weight: bold; color: #fff;">Students (MS / HS / College)</td>
            <td style="padding: 12px; text-align: right; color: #fff;">~350,000</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px; font-weight: bold; color: #fff;">Aware / Reached Audience</td>
            <td style="padding: 12px; text-align: right; color: #fff;">~120,000</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px; font-weight: bold; color: #fff;">Interested Attendees</td>
            <td style="padding: 12px; text-align: right; color: #fff;">~35,000</td>
          </tr>
          <tr style="background-color: #f9fafb; font-weight: bold;">
            <td style="padding: 12px; color: #000;">Event Attendance (Best Case)</td>
            <td style="padding: 12px; text-align: right; color: #000;">10,000 – 15,000</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Key Insight</h3>
      <ul>
        <li>A 10–12% conversion from "interested" to "attending" supports the best-case scenario</li>
        <li>Conservative and expected scenarios require significantly lower conversion rates</li>
      </ul>
    `,
    order: 8
  },
  {
    name: "Scenario Breakdown by Conversion Logic",
    description: `
      <h2>Conservative Case (2,500 – 3,500)</h2>
      <ul>
        <li>Minimal paid media</li>
        <li>Organic awareness</li>
        <li>Strong local curiosity</li>
        <li><strong>Represents ~2–3% conversion from interested audience</strong></li>
      </ul>
      
      <h2>Expected Case (6,500 – 8,500)</h2>
      <ul>
        <li>Paid social and influencer amplification</li>
        <li>Player-driven promotion</li>
        <li>Local media pickup</li>
        <li><strong>Represents ~6–8% conversion</strong></li>
      </ul>
      
      <h2>Best Case (10,000 – 15,000)</h2>
      <ul>
        <li>Viral content moments</li>
        <li>Influencer attendance</li>
        <li>Strong Turf Paradise cross-promotion</li>
        <li>Favorable weather and weekend timing</li>
        <li><strong>Represents ~10–12% conversion</strong></li>
      </ul>
    `,
    order: 9
  },
  {
    name: "Why These Numbers Are Defensible",
    description: `
      <ul>
        <li>Attendance is not dependent on disc golf fans alone</li>
        <li>Multiple independent feeder audiences reduce risk</li>
        <li>Continuous-entry format supports high daily gate counts</li>
        <li>Turf Paradise infrastructure supports scale</li>
        <li>Conservative framing prioritizes atmosphere and sponsor value over density</li>
      </ul>
    `,
    order: 10
  },
  {
    name: "Investor & Sponsor Takeaway",
    description: `
      <p>FLI Golf's attendance projections are grounded in real local participation, youth demographics, and regional travel behavior. Even modest conversion rates from a broad, accessible audience base support a 10,000–15,000 person best-case turnout while maintaining conservative, operationally sound expectations for Season 1.</p>
    `,
    order: 11
  }
];

async function addAudienceProjectionsData() {
  try {
    console.log('🔄 Starting to add audience projections data...');
    
    // Authenticate as admin
    console.log('🔐 Authenticating as admin...');
    await pb.admins.authWithPassword(
      process.env.POCKETBASE_ADMIN_EMAIL,
      process.env.POCKETBASE_ADMIN_PASSWORD
    );
    console.log('✅ Authenticated successfully!');
    
    console.log('📊 Checking existing records...');
    
    const existing = await pb.collection('audience_projections').getList(1, 50);
    console.log(`Current audience_projections count: ${existing.totalItems}`);
    
    if (existing.totalItems > 0) {
      console.log('🗑️  Deleting existing records to update with new styles...');
      for (const record of existing.items) {
        await pb.collection('audience_projections').delete(record.id);
        console.log(`   Deleted: ${record.name}`);
      }
    }
    
    for (const projection of audienceProjectionsData) {
      const record = await pb.collection('audience_projections').create(projection);
      console.log(`✅ Added: ${projection.name} (ID: ${record.id})`);
    }
    
    console.log('✅ All audience projections data added successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
  }
}

addAudienceProjectionsData();
