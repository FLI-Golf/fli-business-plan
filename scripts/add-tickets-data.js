import PocketBase from 'pocketbase';
import dotenv from 'dotenv';

dotenv.config();

const pb = new PocketBase('https://few-likely.pockethost.io');

const ticketsData = [
  {
    name: "Core Assumptions",
    description: `
      <h2>Conservative Attendance Used for Revenue Modeling</h2>
      <ul>
        <li><strong>2,750 attendees</strong> (midpoint of 2,500–3,000)</li>
      </ul>
      
      <h3>Required Average Ticket Price</h3>
      <p>$500,000 ÷ 2,750 ≈ <strong>$182 per attendee</strong></p>
      
      <p>That average is achieved by:</p>
      <ul>
        <li>Keeping GA affordable</li>
        <li>Shifting 40–45% of attendees into premium tiers</li>
        <li>Using Turf Paradise's space for hospitality-style experiences</li>
      </ul>
    `,
    order: 1
  },
  {
    name: "General Admission (GA)",
    description: `
      <h2>🎟️ General Admission</h2>
      <ul>
        <li><strong>Price:</strong> $35</li>
        <li><strong>Share of Attendance:</strong> ~30%</li>
        <li><strong>Units:</strong> 825</li>
        <li><strong>Revenue:</strong> 825 × $35 = <strong>$28,875</strong></li>
      </ul>
      
      <h3>Purpose</h3>
      <ul>
        <li>Accessibility</li>
        <li>Visual crowd density</li>
        <li>Walk-up buyers</li>
      </ul>
    `,
    order: 2
  },
  {
    name: "Reserved Seating",
    description: `
      <h2>🎟️ Reserved Seating</h2>
      <ul>
        <li><strong>Price:</strong> $75</li>
        <li><strong>Share of Attendance:</strong> ~25%</li>
        <li><strong>Units:</strong> 690</li>
        <li><strong>Revenue:</strong> 690 × $75 = <strong>$51,750</strong></li>
      </ul>
      
      <h3>Purpose</h3>
      <ul>
        <li>Families</li>
        <li>Core sports fans</li>
        <li>Predictable inventory</li>
      </ul>
    `,
    order: 3
  },
  {
    name: "VIP All-Access",
    description: `
      <h2>⭐ VIP All-Access</h2>
      <ul>
        <li><strong>Price:</strong> $200</li>
        <li><strong>Share of Attendance:</strong> ~25%</li>
        <li><strong>Units:</strong> 690</li>
        <li><strong>Revenue:</strong> 690 × $200 = <strong>$138,000</strong></li>
      </ul>
      
      <h3>Includes</h3>
      <ul>
        <li>Premium seating</li>
        <li>Shaded areas</li>
        <li>Dedicated bar access</li>
        <li>VIP lounge</li>
      </ul>
    `,
    order: 4
  },
  {
    name: "Field-Level / Course-Side Pass",
    description: `
      <h2>⭐⭐ Field-Level / Course-Side Pass</h2>
      <ul>
        <li><strong>Price:</strong> $350</li>
        <li><strong>Share of Attendance:</strong> ~15%</li>
        <li><strong>Units:</strong> 415</li>
        <li><strong>Revenue:</strong> 415 × $350 = <strong>$145,250</strong></li>
      </ul>
      
      <h3>Includes</h3>
      <ul>
        <li>On-course proximity</li>
        <li>Player warm-up access</li>
        <li>Premium lounge</li>
        <li>High-end viewing experience</li>
      </ul>
    `,
    order: 5
  },
  {
    name: "Founder's Club / Platinum",
    description: `
      <h2>🏆 Founder's Club / Platinum</h2>
      <ul>
        <li><strong>Price:</strong> $750</li>
        <li><strong>Units:</strong> 80</li>
        <li><strong>Revenue:</strong> 80 × $750 = <strong>$60,000</strong></li>
      </ul>
      
      <h3>Includes</h3>
      <ul>
        <li>Hospitality suite access</li>
        <li>Meet & greet windows</li>
        <li>Signed merchandise</li>
        <li>Priority access everywhere</li>
      </ul>
    `,
    order: 6
  },
  {
    name: "Corporate / Group Hospitality",
    description: `
      <h2>👥 Corporate / Group Hospitality</h2>
      <ul>
        <li><strong>Price:</strong> $5,000</li>
        <li><strong>Packages:</strong> 15</li>
        <li><strong>Revenue:</strong> 15 × $5,000 = <strong>$75,000</strong></li>
      </ul>
      
      <h3>Includes</h3>
      <ul>
        <li>10–15 premium tickets</li>
        <li>Branded seating or lounge</li>
        <li>Sponsor-style presence (without full sponsorship cost)</li>
      </ul>
    `,
    order: 7
  },
  {
    name: "Conservative Revenue Summary",
    description: `
      <h2>Revenue Breakdown</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f3f4f6; border-bottom: 2px solid #e5e7eb;">
            <th style="padding: 12px; text-align: left;">Ticket Type</th>
            <th style="padding: 12px; text-align: center;">Units</th>
            <th style="padding: 12px; text-align: center;">Price</th>
            <th style="padding: 12px; text-align: right;">Revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">General Admission</td>
            <td style="padding: 12px; text-align: center;">825</td>
            <td style="padding: 12px; text-align: center;">$35</td>
            <td style="padding: 12px; text-align: right;">$28,875</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">Reserved Seating</td>
            <td style="padding: 12px; text-align: center;">690</td>
            <td style="padding: 12px; text-align: center;">$75</td>
            <td style="padding: 12px; text-align: right;">$51,750</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">VIP All-Access</td>
            <td style="padding: 12px; text-align: center;">690</td>
            <td style="padding: 12px; text-align: center;">$200</td>
            <td style="padding: 12px; text-align: right;">$138,000</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">Field-Level Pass</td>
            <td style="padding: 12px; text-align: center;">415</td>
            <td style="padding: 12px; text-align: center;">$350</td>
            <td style="padding: 12px; text-align: right;">$145,250</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">Founder's Club</td>
            <td style="padding: 12px; text-align: center;">80</td>
            <td style="padding: 12px; text-align: center;">$750</td>
            <td style="padding: 12px; text-align: right;">$60,000</td>
          </tr>
          <tr style="border-bottom: 2px solid #e5e7eb;">
            <td style="padding: 12px;">Corporate Packages</td>
            <td style="padding: 12px; text-align: center;">15 packages (200 seats)</td>
            <td style="padding: 12px; text-align: center;">$5,000</td>
            <td style="padding: 12px; text-align: right;">$75,000</td>
          </tr>
          <tr style="background-color: #f9fafb; font-weight: bold;">
            <td style="padding: 12px;">TOTAL</td>
            <td style="padding: 12px; text-align: center;">~2,900 attendees</td>
            <td style="padding: 12px; text-align: center;">—</td>
            <td style="padding: 12px; text-align: right;">$498,875</td>
          </tr>
        </tbody>
      </table>
      
      <h3>🎯 Result</h3>
      <ul>
        <li>Attendance stays inside 2,500–3,000</li>
        <li>Revenue essentially hits $500,000</li>
        <li>No sellout assumptions</li>
        <li>No unrealistic GA volume</li>
      </ul>
    `,
    order: 8
  },
  {
    name: "Why This Is Defensible to Investors",
    description: `
      <blockquote style="border-left: 4px solid #3b82f6; padding-left: 16px; margin: 20px 0; font-style: italic;">
        "Because our venue footprint is controlled and our course is stadium-style, we intentionally cap attendance and monetize proximity, hospitality, and access rather than volume."
      </blockquote>
      
      <h3>Key Strengths</h3>
      <ul>
        <li>Premium pricing aligns with limited-access experience</li>
        <li>Corporate packages reduce risk</li>
        <li>High per-capita spend impresses VCs</li>
        <li>Leaves massive upside when attendance scales later</li>
      </ul>
      
      <h3>Reality Check</h3>
      <p><strong>This model does not rely on:</strong></p>
      <ul>
        <li>National fame</li>
        <li>Sellouts</li>
        <li>Perfect weather</li>
        <li>Disc golf diehards only</li>
      </ul>
      
      <p><strong>It relies on:</strong></p>
      <ul>
        <li>Phoenix disposable income</li>
        <li>Corporate entertainment budgets</li>
        <li>Novelty + exclusivity</li>
        <li>Turf Paradise's hospitality DNA</li>
        <li>Celebrity Appearance/Music Act</li>
      </ul>
    `,
    order: 9
  },
  {
    name: "Food & Beverage Revenue",
    description: `
      <h2>Conservative Model | 2,500–3,000 Attendees</h2>
      
      <h3>Key Assumptions</h3>
      <ul>
        <li><strong>Average spend per attendee (conservative):</strong> $20</li>
        <li>Includes drinks, snacks, concession items</li>
        <li>Assumes some GA attendees spend less, VIP spenders spend more</li>
        <li><strong>Premium tiers / VIP spend:</strong> $50 per VIP/field-level attendee</li>
        <li>GA: $10–$15</li>
        <li>Reserved seating: $15–$20</li>
        <li>VIP/Field-Level: $40–$50</li>
        <li><strong>Conversion:</strong> ~90% of attendees purchase at least 1 item</li>
      </ul>
      
      <h3>Per-Ticket Average Food & Beverage Spend</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f3f4f6; border-bottom: 2px solid #e5e7eb;">
            <th style="padding: 12px; text-align: left;">Ticket Type</th>
            <th style="padding: 12px; text-align: center;">Avg Spend</th>
            <th style="padding: 12px; text-align: center;">Units</th>
            <th style="padding: 12px; text-align: right;">Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">GA</td>
            <td style="padding: 12px; text-align: center;">$10</td>
            <td style="padding: 12px; text-align: center;">825</td>
            <td style="padding: 12px; text-align: right;">$8,250</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">Reserved</td>
            <td style="padding: 12px; text-align: center;">$15</td>
            <td style="padding: 12px; text-align: center;">690</td>
            <td style="padding: 12px; text-align: right;">$10,350</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">VIP All-Access</td>
            <td style="padding: 12px; text-align: center;">$40</td>
            <td style="padding: 12px; text-align: center;">690</td>
            <td style="padding: 12px; text-align: right;">$27,600</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">Field-Level</td>
            <td style="padding: 12px; text-align: center;">$50</td>
            <td style="padding: 12px; text-align: center;">415</td>
            <td style="padding: 12px; text-align: right;">$20,750</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">Founder's Club</td>
            <td style="padding: 12px; text-align: center;">$50</td>
            <td style="padding: 12px; text-align: center;">80</td>
            <td style="padding: 12px; text-align: right;">$4,000</td>
          </tr>
          <tr style="border-bottom: 2px solid #e5e7eb;">
            <td style="padding: 12px;">Corporate / Group</td>
            <td style="padding: 12px; text-align: center;">$50</td>
            <td style="padding: 12px; text-align: center;">200</td>
            <td style="padding: 12px; text-align: right;">$10,000</td>
          </tr>
          <tr style="background-color: #f9fafb; font-weight: bold;">
            <td style="padding: 12px;">TOTAL F&B REVENUE</td>
            <td style="padding: 12px; text-align: center;">—</td>
            <td style="padding: 12px; text-align: center;">2,900</td>
            <td style="padding: 12px; text-align: right;">$80,950</td>
          </tr>
        </tbody>
      </table>
      
      <p><em>Rounded conservatively to $80–$85K per event</em></p>
      
      <h3>Combined Revenue (Tickets + Food & Alcohol)</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f3f4f6; border-bottom: 2px solid #e5e7eb;">
            <th style="padding: 12px; text-align: left;">Revenue Stream</th>
            <th style="padding: 12px; text-align: right;">Conservative Scenario</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">Ticket Revenue</td>
            <td style="padding: 12px; text-align: right;">$498,875</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px;">Food & Alcohol</td>
            <td style="padding: 12px; text-align: right;">$80,950</td>
          </tr>
          <tr style="background-color: #f9fafb; font-weight: bold; border-top: 2px solid #e5e7eb;">
            <td style="padding: 12px;">TOTAL EVENT REVENUE</td>
            <td style="padding: 12px; text-align: right;">$579,825</td>
          </tr>
        </tbody>
      </table>
      
      <p>This shows that ticket + F&B alone comfortably exceeds the $500K conservative per-event projection.</p>
      
      <h3>Key Takeaways</h3>
      <ul>
        <li>Even with low attendance (2,500–3,000), the per-capita monetization keeps revenue strong.</li>
        <li>VIP and Field-Level tickets drive both ticket and F&B revenue, making them high-impact units.</li>
        <li>Conservative F&B spend assumptions leave upside potential if attendees spend more or if alcohol sales are higher than projected.</li>
        <li>Revenue isn't reliant solely on ticket pricing — experiential spending is a significant contributor.</li>
      </ul>
    `,
    order: 10
  }
];

async function addTicketsData() {
  try {
    console.log('🔄 Starting to add tickets data...');
    
    // Authenticate as admin
    console.log('🔐 Authenticating as admin...');
    await pb.admins.authWithPassword(
      process.env.POCKETBASE_ADMIN_EMAIL,
      process.env.POCKETBASE_ADMIN_PASSWORD
    );
    console.log('✅ Authenticated successfully!');
    
    console.log('📊 Checking existing records...');
    
    const existing = await pb.collection('tickets').getList(1, 50);
    console.log(`Current tickets count: ${existing.totalItems}`);
    
    if (existing.totalItems > 0) {
      console.log('⚠️  Collection already has data. Skipping to avoid duplicates.');
      return;
    }
    
    for (const ticket of ticketsData) {
      const record = await pb.collection('tickets').create(ticket);
      console.log(`✅ Added: ${ticket.name} (ID: ${record.id})`);
    }
    
    console.log('✅ All tickets data added successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
  }
}

addTicketsData();
