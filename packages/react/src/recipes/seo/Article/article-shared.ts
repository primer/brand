import placeholderImage from '../../../fixtures/images/background-poster-ai.png'

/**
 * This is an example of a remote content that can be fetched from a CMS or a markdown file,
 * and used to a) populate the article content, and b) generate a table of contents.
 */
const realWorldContent = [
  // eslint-disable-next-line github/unescaped-html-literal
  `<p>
    While DevOps is sometimes referred to as a methodology, it&apos;s better understood as a set of practices,
    ideas, and methodologies that share a common philosophy: continuous value delivery. Put simply, there&apos;s no one-size-fits-all approach to DevOps—and successful examples of DevOps can look very different from one organization to another.
    </p>
    <p>
    At GitHub, we design tools for DevOps organizations and work with leading teams and companies. In doing so, we&apos;ve identified a number of common pain points people experience when adopting DevOps.
    </p>
    <hr />
    <h2 id="is-devops-a-methodology-or-a-process">Is DevOps a methodology or a process?</h2>
    <p>If you ask 10 people to define DevOps, you&apos;re likely to get at least five different answers. Some people might focus on the practical implementation of DevOps—CI/CD, test automation, and so on—and they&apos;ll call it a process. Others might call DevOps a methodology with a set of processes that work together under a coherent philosophy.</p>
    <p>But both of these definition miss the larger point: DevOps consists of a set of practices that are adaptable to each business that adopts them.</p>
    <p>At GitHub, we believe it&apos;s better to understand DevOps as a framework for thinking about how to deliver value through software. It&apos;s more than a single methodology or collection of processes. It&apos;s fundamentally a set of practices—both cultural and technological. Let&apos;s break that down.</p>
    <h3 id="understanding-devops-as-a-framework">Understanding DevOps as a framework</h3>
    <p>For decades, people have promoted neatly defined ideas of how each step of the software development lifecycle should work. But what seems like genius in a whitepaper often falls apart in practice because each organization is different.</p>
    <p>DevOps acknowledges that. Rather than prescribe every detail, DevOps brings together a set of practices, cultural ideas, and tooling that work under a framework that's malleable for the needs of a given team and organization.</p>
    <p>At its core, DevOps seeks to get higher-quality software into the hands of end users as fast as possible. This commitment to continuously delivering value is foundational to any successful DevOps organization—and it&apos;s accomplish in three ways:</p>
    <ul>
    <li>
        <strong>Continuous improvement:</strong> Small changes are easier to manage and deliver value to users faster than large releases, which can and often do take longer to ship. In a DevOps practice, continuous improvement means shipping iterative changes fast. It also means looking for ways to improve the underlying software with future changes and the SDLC itself to facilitate faster value delivery.
    </li>
    <li>
        <strong>Shared ownership:</strong>  Everyone working on a product shares accountability for the product and its quality—not just their personal area of expertise. This means that every shares accountability and ownership for the end product they ship to end users.
    </li>
    <li>
        <strong>Automation:</strong> Anything that can be automated should be automated across the SDLC in a DevOps practice to deliver value to end users faster through new releases. Automation also helps organizations maximize the time spent building the product, while minimizing the chance for human error.
    </li>
    </ul>
    <h3 id="how-devops-differs-from-agile-and-friends">How DevOps differs from agile and friends</h3>
    <p>Agile, extreme programming, and other similar development methodologies were reactions to the conflict between traditional programming and software distribution through the web.</p>
    <p>Before those ideas became popular, one of the most popular development methodologies was the highly sequential waterfall methodology. In that system, each step had to be complete before the next could start. That often meant lots of paperwork and planning needed to happen before a single line of code could be written.</p>
    <figure>
    <blockquote>
        <p>In 16 months, we've gone from over 30 siloed software engineering groups to a largely cohesive team across McKesson.</p>
        <figcaption>VP, Developer Services and Technology Labs Denis Canty at McKesson</figcaption>
    </blockquote>
    </figure>
    <p>The creators of agile software development principles recognized that over-planning stifled the creativity of software developers—and without working code no one could know if the plans even worked. The Agile Manifesto, for example, said that working software was more important than excessive documentation. Being responsive to change was more valuable than sticking to a plan.</p>
    <p>In practice, the concepts behind the Agile Manifesto were revolutionary. It recognized that working code was the best way to understand and serve customer needs. But that focus on code also meant it had less to say about the rest of the SDLC.</p>
    <p>If agile was a reaction against the old ways, DevOps builds upon agile&apos;s core ideas and applies it to the entire software development life cycle. In fact, some people in the early 2010s called DevOps the second decade of agile.</p>
    <p>To understand the difference between DevOps and Agile, it helps to compare their core tenets:</p>
    <ul>
    <li>
        Fail fast vs. continuous improvement: Agile centers on small, fast iterations where failure is embraced because it shows the process is working. In DevOps, the emphasis is on iteration, automation, and deep collaboration across the entire SDLC to improve delivery speeds and software quality.
    </li>
    <li>
        Developer-centric vs. team-centric: Agile looks at how software developers can best serve customers, but has little to say about how code is tested, deployed, or maintained. In contrast, DevOps brings everyone in the SDLC together under a shared responsibility for delivering value to end users.
    </li>
    <li>
        Features vs. systems thinking: Agile focuses on the here and now of a particular feature, whereas DevOps looks holistically at software as a system.
    </li>
    </ul>
    <h2 id="what-is-the-goal-of-devops">What is the goal of DevOps?</h2>
    <p>The goal of DevOps is to match how we make software with the way the cloud enables us to use it. The cloud took us from an era of barriers—individual servers, software release dates, role-based silos—to an open world where software is ubiquitous.</p>
    <p>In the past, software development had distinct stages and a final product that might be compared to a production line. This was understandable—in the era of physical media, software development was a far more regimented and linear process. After all, a final release actually was final in a sense since distributing updates meant restarting the linear production process from scratch.</p>
    <p>But the modern SDLC isn&apos;t a production line. Software as a service and other innovations in cloud-based technologies and platforms have made distinct releases as relevant today as punch cards and room-sized calculators.</p>
    <p>So, how does DevOps bring the SDLC closer to the always-on, always-up–to-date expectations of the cloud?</p>
    <figure>
    <img
        width="100%"
        src=${placeholderImage}
        alt="placeholder, blank area with a gray background color"
    />
    <figcaption>Image caption</figcaption>
    </figure>
    <h3 id="how-your-organization-can-adopt-devops">How your organization can adopt DevOps</h3>
    <p>
    Successfully adopting DevOps can require some big changes. But rather than reworking all of your processes and tooling overnight, you can take relatively small steps to get started. This might entail making cultural changes to how often your development team integrates their code or automating small pieces of the SDLC in your organization.
    </p>
    <p>No matter where you are on your DevOps journey, there are six key steps you should take to successfully adopt DevOps:</p>
    <ul>
    <li>Change the culture: Success in DevOps starts with deep collaboration between everyone responsible for building, testing, operating, and shipping a product. And that starts with making sure everyone is unified and working together across all stages of the SDLC. This can be a big change for organizations that have role-based siloes between different teams. In a DevOps practice, everyone comes together to deliver higher-quality software faster to customers—and that requires deep collaboration between different people to ensure code is optimized to operate in production environments and production environments are optimized to run the software.</li>
    <li>Focus on incremental builds: DevOps favors small changes that can be quickly delivered to customers and that means breaking features into small chunks that are easier to test, minimize the impact of bugs, and can be shipped to production as fast as possible. There are no hard-and-fast rules in DevOps about how many times a day developers should be integrating new code changes—but the most successful DevOps practices integrate and ship multiple code changes a day.</li>
    <li>Adopt the right tools: In DevOps, there&apos;s no one-size-fits-all approach to tooling. In fact, “DevOps tools” is a bit of an umbrella term with plenty of products and platforms that fall into this category. Picking the right tools and building the right DevOps toolchain starts with identifying what problems you&apos;re trying to solve and what DevOps capabilities you need to invest in. But there are a number of common areas where you&apos;ll need tooling. Speaking of which …</li>
    <li>Automate everything you can: The best DevOps environments think critically about their SDLC and look for places where automation can be applied to remove the need for human intervention—like repetitive tasks such as integrating, testing, and packaging code. By automating repetitive tasks, DevOps helps people make better use of their time and reduces the risk of human error (or people forgetting to run tests, import the right libraries, and so on). As a general rule of thumb, anything that can be automated should be automated in a DevOps practice.</li>
    </ul>
    <figure>
    <blockquote>
        <p>We have a slogan on our team: don't let a human do a machine's job. GitHub helps us achieve that.</p>
        <figcaption>Principal Software Engineer Gabriel Kohen at Blue Yonder</figcaption>
    </blockquote>
    </figure>
    <h4 id="the-move-towards-devsecops">The move towards DevSecOps</h4>
    <p>As a set of practices, DevOps is always evolving—and one of the most apparent evolutions today is through the move to DevSecOps. While DevOps was originally about sharing accountability for how code performs in production, DevSecOps builds on that and seeks to make everyone responsible for that code&apos;s security.</p>
    <p>In our connected world, software security is fundamental—and DevSecOps establishes robust processes to build security into every step of the SDLC. Adapting the DevOps idea of continuous improvement, DevSecOps makes improving security an ongoing process and one that begins as early in the SDLC as possible.</p>
    `,
]

const systemContent = [
  // eslint-disable-next-line github/unescaped-html-literal
  `<h2>Heading level 2</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor lectus ipsum, consectetur convallis diam pretium quis. Proin ut felis ut eros tristique tincidunt.</p>
    <figure>
    <blockquote>
        <p>Nulla ac odio eu magna hendrerit porta. Donec nec eros quis tortor tincidunt vulputate. Aenean id pharetra diam, sit amet auctor leo. Aliquam erat volutpat.</p>
        <figcaption>Lisa Vanderschuit, Engineering Program Manager, Shopify</figcaption>
    </blockquote>
    </figure>
    <p>Integer pellentesque pretium nulla viverra molestie. Praesent quis pretium sapien. Sed convallis eget lectus et pulvinar:</p>
    <ul>
    <li>
        <strong>Vivamus</strong> eu risus nec lectus consequat rutrum at vel lacus.
    </li>
    <li><strong>Donec</strong> at dolor ut metus imperdiet congue vel porta nunc.
    </li>
    <li><strong>Quisque</strong> eu tortor suscipit, congue quam in, bibendum tellus.</li>
    </ul>
    <h3>Heading level 3</h3>
    <p>Pellentesque non ornare ligula. Suspendisse nibh purus, pretium id tortor sit amet, tincidunt gravida augue. Ut malesuada, nisl vel dignissim mollis</p>
    <h4>Heading level  4</h4>
    <p>
    Secure code as you write it. Automatically review every change to your codebase and identify vulnerabilities
    before they reach production. <a href="/#">Learn more here.</a>
    </p>
    <h5>Heading level 5</h5>
    <ol>
    <li>
        Vivamus eu risus nec lectus consequat rutrum at vel lacus.
    </li>
    <li>Donec at dolor ut metus imperdiet congue vel porta nunc.
    </li>
    <li>Quisque eu tortor suscipit, congue quam in, bibendum tellus.</li>
    </ol>
    <p><code>for-each-ref</code> is extremely useful for listing references, finding which references point at a given object (with <code>--points-at</code>), which references have been merged into a given branch (with <code>--merged</code>), or which references contain a given commit (with <code>--contains</code>).</p>
    <h6>Heading level 6</h6>
    <p>Pellentesque non ornare ligula. Suspendisse nibh purus, pretium id tortor sit amet, tincidunt gravida augue.</p>
    <p>Nunc velit odio, posuere eu felis eget, consectetur fermentum nisi. Aenean tempor odio id ornare ultrices. Quisque blandit condimentum tellus, semper efficitur sapien dapibus nec. </p>
    `,
]

export const contentMap = {
  'real-world': realWorldContent,
  system: systemContent,
}
