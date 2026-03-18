import PocketBase from 'pocketbase';
import dotenv from 'dotenv';

dotenv.config();

const pb = new PocketBase(process.env.POCKETBASE_URL || 'https://few-likely.pockethost.io');

const capitalStackData = [
  {
    name: "How the Capital Stack Works",
    description: `
      <h2>Three-Phase Funding Model</h2>

      <h3>Phase 1 — 2026 (Pre-Revenue / Build Year)</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">Capital Raised</td>
            <td style="padding: 10px; text-align: right;">$5,000,000</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">Revenue</td>
            <td style="padding: 10px; text-align: right;">$2.82M</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">Net Loss</td>
            <td style="padding: 10px; text-align: right; color: #ef4444;">-$1.79M</td>
          </tr>
        </tbody>
      </table>
      <p>This is expected. 2026 is focused on infrastructure, brand development, and system buildout.</p>

      <h3>Phase 2 — 2027 (First Full Season Launch)</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">Additional Capital Raised</td>
            <td style="padding: 10px; text-align: right;">$10,000,000</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">Revenue</td>
            <td style="padding: 10px; text-align: right;">$21.39M</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">Net Profit</td>
            <td style="padding: 10px; text-align: right; color: #22c55e;">+$1.08M</td>
          </tr>
        </tbody>
      </table>
      <p>This is the inflection point — the league becomes self-sustaining operationally.</p>

      <h3>Phase 3 — 2028+ (Scale Mode)</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">Revenue Range</td>
            <td style="padding: 10px; text-align: right;">$29.97M → $182.7M (2028–2031)</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">Profit Range</td>
            <td style="padding: 10px; text-align: right; color: #22c55e;">$5.18M → $85.5M</td>
          </tr>
        </tbody>
      </table>
      <p>From this point forward, the model becomes highly cash generative.</p>
    `,
    order: 1
  },
  {
    name: "Do We Need More Capital After 2027?",
    description: `
      <h2>Short Answer: No — If Executed Properly</h2>

      <h3>A. Revenue Is Collected BEFORE Expenses Hit</h3>
      <p>This is the most important structural advantage of FLI Golf.</p>
      <p><strong>Prepaid / Front-Loaded Cash Streams:</strong></p>
      <ul>
        <li>Sponsorships (all tiers paid pre-season)</li>
        <li>Ticket sales (pre-sale model)</li>
        <li>Membership subscriptions (recurring, upfront cycles)</li>
        <li>Apparel / jersey drops (cash before fulfillment cycles)</li>
        <li>Fantasy + gambling deposits</li>
        <li>Licensing deals (often paid upfront or guaranteed minimums)</li>
      </ul>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">2027 Sponsorship Revenue</td>
            <td style="padding: 10px; text-align: right;">≈ $6.275M+</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">2027 Ticket Revenue</td>
            <td style="padding: 10px; text-align: right;">$3M</td>
          </tr>
          <tr style="background-color: #f0fdf4;">
            <td style="padding: 10px; font-weight: bold; color: #166534;">Pre-Season Cash Collected</td>
            <td style="padding: 10px; text-align: right; font-weight: bold; color: #166534;">$9M+ before events begin</td>
          </tr>
        </tbody>
      </table>

      <h3>B. Biggest Cost Driver Is Fully Funded by 2027 Raise</h3>
      <p>2027 Tournament Expenses: <strong>$6.78M</strong></p>
      <ul>
        <li>Covered by the $10M capital raise</li>
        <li>Plus prepaid revenue streams</li>
      </ul>
      <p>Tournament risk is fully de-risked upfront. No mid-season cash flow issues.</p>

      <h3>C. By 2028, Internal Cash Covers Everything</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">2028 Revenue</td>
            <td style="padding: 10px; text-align: right;">$29.97M</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">2028 Profit</td>
            <td style="padding: 10px; text-align: right; color: #22c55e;">$5.18M</td>
          </tr>
        </tbody>
      </table>
      <p>That profit alone funds growth, covers expanded tournaments, and supports international expansion.</p>
    `,
    order: 2
  },
  {
    name: "Why No Dilution Is Needed After 2027",
    description: `
      <h2>The Model Transitions: Capital Dependent → Cash Flow Funded</h2>

      <h3>1. High-Margin Revenue Explosion</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <thead>
          <tr style="background-color: #f3f4f6; border-bottom: 2px solid #e5e7eb;">
            <th style="padding: 10px; text-align: left; color: #000;">Revenue Stream</th>
            <th style="padding: 10px; text-align: center; color: #000;">Early</th>
            <th style="padding: 10px; text-align: center; color: #000;">Scale</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px;">Streaming</td>
            <td style="padding: 10px; text-align: center;">$1M</td>
            <td style="padding: 10px; text-align: center; color: #22c55e; font-weight: bold;">$25M</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px;">Gambling</td>
            <td style="padding: 10px; text-align: center;">$2M</td>
            <td style="padding: 10px; text-align: center; color: #22c55e; font-weight: bold;">$28.8M</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px;">Licensing</td>
            <td style="padding: 10px; text-align: center;">$300K</td>
            <td style="padding: 10px; text-align: center; color: #22c55e; font-weight: bold;">$23M</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px;">Jerseys</td>
            <td style="padding: 10px; text-align: center;">$3.1M</td>
            <td style="padding: 10px; text-align: center; color: #22c55e; font-weight: bold;">$23.2M</td>
          </tr>
        </tbody>
      </table>
      <p>These are scalable, non-linear revenue streams.</p>

      <h3>2. Fixed Cost Structure vs Expanding Revenue</h3>
      <p>Tournament costs increase over time, but revenue grows at a significantly faster rate.</p>
      <p><strong>Margin expansion:</strong> -63% (2026) → +46.8% (2031)</p>

      <h3>3. Cash Conversion Advantage</h3>
      <p>Unlike traditional sports leagues:</p>
      <ul>
        <li>No stadium ownership</li>
        <li>Temporary venues</li>
        <li>Controlled production costs</li>
        <li>Event-based scaling</li>
      </ul>
      <p>This keeps long-term capital requirements low.</p>
    `,
    order: 3
  },
  {
    name: "No Future Dilution — Key Messaging",
    description: `
      <h2>FLI Golf Requires Only Two Capital Events</h2>

      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <thead>
          <tr style="background-color: #f3f4f6; border-bottom: 2px solid #e5e7eb;">
            <th style="padding: 10px; text-align: left; color: #000;">Round</th>
            <th style="padding: 10px; text-align: center; color: #000;">Amount</th>
            <th style="padding: 10px; text-align: left; color: #000;">Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">Round 1 — 2026</td>
            <td style="padding: 10px; text-align: center; font-weight: bold;">$5M</td>
            <td style="padding: 10px;">Builds the business, secures partnerships, launches revenue engines</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">Round 2 — 2027</td>
            <td style="padding: 10px; text-align: center; font-weight: bold;">$10M</td>
            <td style="padding: 10px;">Funds first full tournament season, fully de-risks live event execution</td>
          </tr>
        </tbody>
      </table>

      <h3>No Additional Equity Raises Required After 2027</h3>
      <ul>
        <li>The league becomes cash flow positive in Year 2</li>
        <li>Revenue is collected ahead of expenses</li>
        <li>High-growth verticals scale rapidly</li>
        <li>Internal profits fund expansion</li>
      </ul>

      <h3>If Additional Capital Is Ever Used</h3>
      <p>It would be <strong>optional, not required</strong>, and structured as:</p>
      <ul>
        <li>Debt</li>
        <li>Revenue-based financing</li>
        <li>Strategic partnerships</li>
      </ul>
      <p><strong>NOT equity dilution.</strong></p>
    `,
    order: 4
  },
  {
    name: "2027 Loan Repayment Strategy",
    description: `
      <h2>Structure Overview</h2>
      <p>Instead of raising equity, the $10M 2027 raise is structured as a loan:</p>
      <ul>
        <li>Minimal equity granted (if any)</li>
        <li>Primary return = cash repayment + interest</li>
        <li>Backed by tournament revenue, ongoing league revenue, and high-growth verticals</li>
      </ul>

      <h3>2028 Financial Position (Repayment Year)</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">Total Revenue (2028)</td>
            <td style="padding: 10px; text-align: right;">$29.97M</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">Net Profit (2028)</td>
            <td style="padding: 10px; text-align: right; color: #22c55e;">$5.18M</td>
          </tr>
        </tbody>
      </table>

      <h3>Available Cash for Debt Service (2028)</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px;">League Operating Profit</td>
            <td style="padding: 10px; text-align: right;">~$5.18M</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px;">Prepaid Sponsorship Revenue</td>
            <td style="padding: 10px; text-align: right;">$7M+</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px;">Ticket Revenue (pre-collected)</td>
            <td style="padding: 10px; text-align: right;">~$3.45M</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px;">Streaming + Gambling + Licensing + Fantasy</td>
            <td style="padding: 10px; text-align: right;">~$6.56M</td>
          </tr>
          <tr style="background-color: #f0fdf4;">
            <td style="padding: 10px; font-weight: bold; color: #166534;">Total Effective Cash Flow Pool</td>
            <td style="padding: 10px; text-align: right; font-weight: bold; color: #166534;">$10M+ realistically available</td>
          </tr>
        </tbody>
      </table>
    `,
    order: 5
  },
  {
    name: "Loan Repayment Options",
    description: `
      <h2>Three Repayment Structures</h2>

      <h3>Option A — Aggressive (1-Year Payoff)</h3>
      <p><strong>Goal:</strong> Eliminate debt immediately in 2028</p>
      <ul>
        <li>Allocate $5M from net profit</li>
        <li>Allocate $5M from prepaid + high-margin revenue</li>
      </ul>
      <p><strong>Result:</strong> Loan fully repaid in 12 months. Investors fully protected. League becomes completely debt-free entering 2029.</p>

      <h3>Option B — Balanced (2-Year Payoff)</h3>
      <p><strong>Goal:</strong> Maintain growth flexibility while repaying quickly</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">2028</td>
            <td style="padding: 10px; text-align: right;">Pay $6M (60%)</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">2029</td>
            <td style="padding: 10px; text-align: right;">Pay $4M (40%) + interest</td>
          </tr>
        </tbody>
      </table>
      <p><strong>Result:</strong> Strong balance sheet. Preserves reinvestment capital. Still avoids dilution.</p>

      <h3>Option C — Revenue-Based Financing</h3>
      <p><strong>Goal:</strong> Flexible repayment tied to performance</p>
      <p>Allocate 15–25% of annual revenue toward repayment.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">Example (2028)</td>
            <td style="padding: 10px; text-align: right;">20% of $29.97M ≈ $6M payment</td>
          </tr>
        </tbody>
      </table>
      <p><strong>Result:</strong> Scales with league growth. Low risk to operations. Attractive to lenders.</p>
    `,
    order: 6
  },
  {
    name: "Summary",
    description: `
      <h2>Capital Stack at a Glance</h2>

      <h3>Funding Plan</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb; background-color: #f0fdf4;">
            <td style="padding: 10px; font-weight: bold; color: #166534;">2026</td>
            <td style="padding: 10px; color: #166534;">$5M → Business Build + Revenue Setup</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb; background-color: #f0fdf4;">
            <td style="padding: 10px; font-weight: bold; color: #166534;">2027</td>
            <td style="padding: 10px; color: #166534;">$10M → Tournament Execution</td>
          </tr>
          <tr style="background-color: #f0fdf4;">
            <td style="padding: 10px; font-weight: bold; color: #166534;">2028+</td>
            <td style="padding: 10px; color: #166534;">Self-Funded Growth</td>
          </tr>
        </tbody>
      </table>

      <h3>Financial Transition</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">2026</td>
            <td style="padding: 10px;">Build Phase (Expected Loss)</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">2027</td>
            <td style="padding: 10px;">Break-even / Profitability</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">2028+</td>
            <td style="padding: 10px;">Scalable Profit Engine</td>
          </tr>
        </tbody>
      </table>

      <h3>Dilution Protection</h3>
      <ul>
        <li>No required future raises</li>
        <li>Strong prepaid revenue model</li>
        <li>Positive cash flow from Year 2</li>
        <li>Expansion funded internally</li>
      </ul>

      <h3>Final Position</h3>
      <p>FLI Golf is designed to:</p>
      <ul>
        <li>Require only two capital raises</li>
        <li>Achieve profitability in Year 2</li>
        <li>Scale using internal cash flow</li>
        <li>Protect early investors from dilution</li>
      </ul>
    `,
    order: 7
  }
];

async function addCapitalStackData() {
  try {
    console.log('🔄 Starting to add capital stack data...');

    console.log('🔐 Authenticating as admin...');
    await pb.admins.authWithPassword(
      process.env.POCKETBASE_ADMIN_EMAIL,
      process.env.POCKETBASE_ADMIN_PASSWORD
    );
    console.log('✅ Authenticated successfully!');

    // Create collection if it doesn't exist, or clear existing records
    let existing;
    try {
      existing = await pb.collection('capital_stack').getList(1, 50);
      console.log(`Current capital_stack count: ${existing.totalItems}`);

      if (existing.totalItems > 0) {
        console.log('🗑️  Deleting existing records...');
        for (const record of existing.items) {
          await pb.collection('capital_stack').delete(record.id);
          console.log(`   Deleted: ${record.name}`);
        }
      }
    } catch (e) {
      console.log('Collection may not exist yet — will be created via PocketBase admin.');
      console.log('Please create a "capital_stack" collection in PocketBase with fields: name (text), description (editor/text), order (number)');
      console.log('Then re-run this script.');
      process.exit(1);
    }

    for (const item of capitalStackData) {
      const record = await pb.collection('capital_stack').create(item);
      console.log(`✅ Added: ${item.name} (ID: ${record.id})`);
    }

    console.log('✅ All capital stack data added successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2));
    }
  }
}

addCapitalStackData();
