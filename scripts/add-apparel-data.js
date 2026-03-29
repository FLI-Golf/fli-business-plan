import PocketBase from 'pocketbase';
import dotenv from 'dotenv';
import https from 'https';
import http from 'http';
import { Buffer } from 'buffer';

dotenv.config();

const pb = new PocketBase(process.env.DATABASE_URL || 'https://few-likely.pockethost.io');

// Image URLs from the images doc
const imageUrls = [
  'https://lh7-rt.googleusercontent.com/docsz/AD_4nXehqrQu-8aivn30V8ZV0TqMt9IKDi2rl1F8uFa8y5Yipn-IvA57N3FEsY1VI0MdvrBRdWf_LNC6Gq8q8-Ub3eLlzASczJMOr_1llU0nihnEqfdfHovD_Z9FwlQpuGf7dwGDDNCPeuif708ioIO0ncbe?key=fY5yA_tsSkFhegqhsbUhtw',
  'https://lh7-rt.googleusercontent.com/docsz/AD_4nXcWaE2lrge74VFMpcRy4h_-2cnr_sMYXGuE9Ily5zje02Q_2T6M34fivluewxMP9DoNUqHhwykdaDKQatNt4HUKrbss3oSOA86UodkRKSXYVNhbR0J0Ml5Ia2iveEW5d43INcQKX3-a6OdEmBWSI8xs?key=fY5yA_tsSkFhegqhsbUhtw',
  'https://lh7-rt.googleusercontent.com/docsz/AD_4nXenU1c5j6YdrRfgscsHCACXPN5C5YW0JDY1rg28ThUISICROGzjlaM6PCoAaEj3qSWqIL2b1GGNcOru3zhIdyTqQHrzSeyJBcNaJvPu0VQLTiikuf0s7ATxjD786zta2NGIEo31Vx3UKU3TU_IMYBmE?key=fY5yA_tsSkFhegqhsbUhtw',
  'https://lh7-rt.googleusercontent.com/docsz/AD_4nXfp2HsFXa-9h_XDNLksNwfZKkXCm5LtXI0k7P2alMHwj7b1hZF_sovCIX5eff_7uLgOyqROrm1wL3CoZW-3isg3Om9NYaX405_WEWy7Tuf0UC06t7eyEGJfJiC7KQDhWDVXKmhfnw406QPSViO1ziY?key=fY5yA_tsSkFhegqhsbUhtw',
  'https://lh7-rt.googleusercontent.com/docsz/AD_4nXceJGMphuIaP1R9Vf04MGu3kuEEY28GtBJrFalP-svnzPB506dczeJWB9Pq_D5DxWNSyqPxwfWaUJNmoQvTgXQIkFpFGC_TAX1EkG_5xNwb8VXZOB5DjohxyDbiGZS_RMIYY-ndCiprZksf7ZEk1Oc?key=fY5yA_tsSkFhegqhsbUhtw',
  'https://lh7-rt.googleusercontent.com/docsz/AD_4nXc6dLg6cNW_QFiwh-TEyZK3AgJH0tz7LIMetxAzPDWgs0LzkyHXM5ocqwOvTcKACqyQGy9ksZfc5eExkclTwFNnr1UtfXEOiWMTpBj-n6Lg4qB4QZQr5g67WQhE0YabzU7Kb1ScECjLtbIswSii8Fkp?key=fY5yA_tsSkFhegqhsbUhtw',
  'https://lh7-rt.googleusercontent.com/docsz/AD_4nXci1oh6uinWdEwYi5hTq4qtivOrEbDz6Nam9DvSo4duEZ6DsMIPBO580M-AtlMnZY0ahKuxdCccinpKnuVH09kEiOeIIEZIV_zyN4FIwixbJqUQcyx13vsJFnBDzGXJpQAI1WSN6YNhVeK0guuVjvII?key=fY5yA_tsSkFhegqhsbUhtw',
  'https://lh7-rt.googleusercontent.com/docsz/AD_4nXf8jnn5we9Vti6xVWNGE9abMEFy8WoZ58yR00PaFKY_vzp9-96ySGfxVkdaz8jv4SBfj6_bZRBRVrSOVM1YcrdIIXNlWLAYyyXW86fqFSj9ZrD-UqTUxZIqVED-4IUMGhEG22kjFihjNW_d6ZvAkNI?key=fY5yA_tsSkFhegqhsbUhtw',
  'https://lh7-rt.googleusercontent.com/docsz/AD_4nXeJdPDAHz7CCXrtPQa-7GILmeN9wrcRLUpgwAP7q9KY9hMDqmVkXXoGwfSKJTv09FVwp8yfauVgvbi1L55tSmxWPp5IBfmqgn4G0fm8JapCwNm8oY6iRJg1pEmuyccsDop3d2MIO5oKdC0owpj_Vi-P?key=fY5yA_tsSkFhegqhsbUhtw',
  // image 10 URL is truncated in source doc — skipped
  'https://lh7-rt.googleusercontent.com/docsz/AD_4nXcXoMCWZTA0Yd1bk5heb751Non4gHm4UNw55aK-c4PBWg46T3-8ql5jf7Ow79j1xNIkP3HCuVK9CBd-kGvKbEpNAwqaN-1ut7BjvoiWxmP04fI6_e1m8KEuFiHcp0k7dF8Qkv7l6m8pwPkJ1bLWTrU?key=fY5yA_tsSkFhegqhsbUhtw',
  'https://lh7-rt.googleusercontent.com/docsz/AD_4nXeyswLYdrHh3la6AZaxzzea11_7Gqm6eXAmkxWF53jvQ9RzLJE2XsaLCVU_3WzTWvMA1rG3IFqcF3UhZ1yT8bWGph6Xc64uYfbwYM8ZBLfkeU-XD96dou_SW9njO-WHUQBKAyhAvWU_aIi1aPE41eM?key=fY5yA_tsSkFhegqhsbUhtw'
];

// Also include the overview image from the content doc
const overviewImageUrl = 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXcDU9VLzXxNbSjTRZsKv8bdCtpFNYPvfw8S3uGwtP92rrZOWbffWXVraKxiIpwSeL4Ecf1QNMpjhCtMISB5y0kaZewu-caMD60JRDdP78QqoROrewVETo1Xd8uL4qbeag?key=qcRo4YEQSc7zt_JOCWRU_g';

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve({ buffer: Buffer.concat(chunks), contentType: res.headers['content-type'] || 'image/jpeg' }));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function bufferToBlob(buffer, contentType) {
  return new Blob([buffer], { type: contentType });
}

const apparelData = [
  {
    title: 'Overview',
    body: `
      <h2>FLI Golf Sports Apparel Marketing Plan</h2>
      <p>FLI Golf isn't just an apparel line — it's the cultural front door to the future of disc golf.</p>
    `,
    order: 1,
    imageUrls: [overviewImageUrl]
  },
  {
    title: '1. Core Objectives',
    body: `
      <ul>
        <li>Build brand awareness in both disc golf and mainstream sports culture.</li>
        <li>Position FLI Golf as inclusive, performance-driven, and culturally relevant.</li>
        <li>Drive direct-to-consumer (DTC) sales via the website.</li>
        <li>Use limited retail exclusivity (Another Round) to build scarcity and buzz.</li>
        <li>Create hype with quarterly limited drops while maintaining a core line year-round.</li>
      </ul>
    `,
    order: 2,
    imageUrls: []
  },
  {
    title: '2. Target Audiences',
    body: `
      <ul>
        <li><strong>Disc Golf Athletes &amp; Fans</strong> — Already in the sport, looking for authentic representation.</li>
        <li><strong>Streetwear Enthusiasts</strong> — Drawn by exclusivity, drops, and athlete culture.</li>
        <li><strong>Youth Market (12–25)</strong> — Crossover with skate, surf, and sneaker culture.</li>
        <li><strong>Lifestyle Sports Fans</strong> — Those into basketball, soccer, and alternative sports seeking unique apparel.</li>
      </ul>
    `,
    order: 3,
    imageUrls: []
  },
  {
    title: '3. Pre-Launch (4–6 Weeks Out)',
    body: `
      <h3>Teaser Campaign</h3>
      <ul>
        <li>Dark "coming soon" visuals across Instagram, TikTok, and YouTube Shorts.</li>
        <li>Hashtag campaign: <strong>#FLITakesFlight</strong>.</li>
      </ul>
      <h3>Athlete Seeding</h3>
      <ul>
        <li>Signed athletes receive first kits; post organically to build anticipation.</li>
      </ul>
      <h3>Influencer Hints</h3>
      <ul>
        <li>Major disc golf and lifestyle influencers teased with exclusive samples.</li>
      </ul>
      <h3>Email &amp; SMS Collection</h3>
      <ul>
        <li>Pre-launch landing page with countdown and sign-up incentives (first access).</li>
      </ul>
    `,
    order: 4,
    imageUrls: []
  },
  {
    title: '4. Launch Phase (Month 1–2)',
    body: `
      <h3>Hero Content (Photoshoot + Video)</h3>
      <ul>
        <li>2-day professional shoot (athletes + models + kids).</li>
        <li>Launch video: mix of hype, culture, disc golf action, and lifestyle visuals.</li>
      </ul>
      <h3>Digital Push</h3>
      <ul>
        <li>Social media blitz with athletes and influencers.</li>
        <li>Paid ads on Instagram, Facebook, TikTok — geo-targeted around disc golf hotbeds.</li>
        <li>YouTube pre-roll ads targeting sports/lifestyle content.</li>
      </ul>
      <h3>PR &amp; Media</h3>
      <ul>
        <li>Press release to sports, lifestyle, and streetwear outlets.</li>
        <li>Features in disc golf podcasts, YouTube channels, and local media.</li>
      </ul>
      <h3>Retail Drop (Another Round)</h3>
      <ul>
        <li>Launch-day events in select cities (exclusive in-store release parties).</li>
      </ul>
    `,
    order: 5,
    imageUrls: []
  },
  {
    title: '5. Sustained Growth (Months 3–12)',
    body: `
      <h3>Quarterly Limited Drops</h3>
      <ul>
        <li>Collaborations with athletes, influencers, or artists.</li>
        <li>Hype-driven releases with countdown marketing.</li>
      </ul>
      <h3>Content Strategy</h3>
      <ul>
        <li>Weekly athlete-led posts (in competition, in lifestyle).</li>
        <li>Behind-the-scenes stories of the league + apparel.</li>
        <li>TikTok trend participation with branded spin.</li>
      </ul>
      <h3>Ambassador Program</h3>
      <ul>
        <li>Recruit micro-influencers in disc golf communities nationwide.</li>
        <li>Provide gear for content creation and grassroots marketing.</li>
      </ul>
      <h3>Event Activation</h3>
      <ul>
        <li>Pop-up FLI Golf shops at tournaments, festivals, and youth sports events.</li>
      </ul>
    `,
    order: 6,
    imageUrls: []
  },
  {
    title: '6. Budget Allocation (First 12 Months – $45,000)',
    body: `
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tbody>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">Digital Ads (Meta, TikTok, Google)</td>
            <td style="padding: 10px; text-align: right;">$20,000</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">Athlete &amp; Influencer Seeding</td>
            <td style="padding: 10px; text-align: right;">$10,000 (gear gifting, content packages)</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">Photoshoot &amp; Content Creation</td>
            <td style="padding: 10px; text-align: right;">$10,000 (already budgeted in costs)</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">Event Activations (pop-ups, retail launches)</td>
            <td style="padding: 10px; text-align: right;">$5,000</td>
          </tr>
        </tbody>
      </table>
    `,
    order: 7,
    imageUrls: []
  },
  {
    title: '7. KPIs & Success Metrics',
    body: `
      <h3>Sales Targets</h3>
      <p>5,000 units sold in first 12 months.</p>
      <h3>Digital Growth</h3>
      <ul>
        <li>Instagram → 50K followers</li>
        <li>TikTok → 25K followers</li>
        <li>Email/SMS list → 15K subscribers</li>
      </ul>
      <h3>Engagement</h3>
      <p>&gt;5% engagement rate on athlete/influencer posts.</p>
      <h3>Sell-Through Rate</h3>
      <p>80%+ of each limited drop sells out in &lt;30 days.</p>
    `,
    order: 8,
    imageUrls: []
  },
  {
    title: 'Jersey Samples',
    body: `
      <p>Final jersey samples for the FLI Golf apparel line.</p>
    `,
    order: 9,
    imageUrls: imageUrls
  }
];

async function createCollectionIfNeeded() {
  // Always delete and recreate to ensure correct schema and rules
  try {
    const existing = await pb.collections.getOne('apparel');
    // Clear records first
    const records = await pb.collection('apparel').getList(1, 200, {}, { headers: { Authorization: pb.authStore.token } });
    for (const rec of records.items) {
      await pb.collection('apparel').delete(rec.id);
    }
    await pb.collections.delete(existing.id);
    console.log('Deleted existing "apparel" collection.');
  } catch {
    // doesn't exist yet
  }

  console.log('Creating "apparel" collection...');
  await pb.collections.create({
    name: 'apparel',
    type: 'base',
    listRule: '',
    viewRule: '',
    createRule: null,
    updateRule: null,
    deleteRule: null,
    fields: [
      {
        name: 'title',
        type: 'text',
        required: false,
        presentable: false,
        system: false
      },
      {
        name: 'body',
        type: 'editor',
        required: false,
        presentable: false,
        system: false,
        convertURLs: false
      },
      {
        name: 'order',
        type: 'number',
        required: false,
        presentable: false,
        system: false,
        min: null,
        max: null,
        onlyInt: false
      },
      {
        name: 'images',
        type: 'file',
        required: false,
        presentable: false,
        system: false,
        maxSelect: 20,
        maxSize: 10485760,
        mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        protected: false,
        thumbs: ['800x0', '1200x0']
      }
    ]
  });
  console.log('Collection "apparel" created with public read rules.');
}

async function addApparelData() {
  try {
    await pb.admins.authWithPassword(
      process.env.POCKETBASE_ADMIN_EMAIL,
      process.env.POCKETBASE_ADMIN_PASSWORD
    );
    console.log('Authenticated as admin.');

    await createCollectionIfNeeded();

    for (const section of apparelData) {
      const formData = new FormData();
      formData.append('title', section.title);
      formData.append('body', section.body);
      formData.append('order', String(section.order));

      if (section.imageUrls && section.imageUrls.length > 0) {
        console.log(`  Downloading ${section.imageUrls.length} image(s) for "${section.title}"...`);
        for (let i = 0; i < section.imageUrls.length; i++) {
          try {
            const { buffer, contentType } = await downloadImage(section.imageUrls[i]);
            const ext = contentType.includes('png') ? 'png' : contentType.includes('gif') ? 'gif' : contentType.includes('webp') ? 'webp' : 'jpg';
            const blob = bufferToBlob(buffer, contentType);
            formData.append('images', blob, `image_${i + 1}.${ext}`);
            console.log(`    Downloaded image ${i + 1} (${buffer.length} bytes)`);
          } catch (err) {
            console.warn(`    Failed to download image ${i + 1}: ${err.message}`);
          }
        }
      }

      const record = await pb.collection('apparel').create(formData);
      console.log(`✅ Created: "${section.title}" (id: ${record.id})`);
    }

    console.log('\n✅ All apparel data added successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2));
    }
  }
}

addApparelData();
