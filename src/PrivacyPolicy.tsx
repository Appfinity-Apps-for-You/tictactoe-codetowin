import { Box, Link, Typography } from "@mui/material"
import { Helmet } from "react-helmet"

export default function PrivacyPolicy() {
	return (
		<Box sx={{ flexGrow: 1}} >
			<Helmet>
				<title>Tic Tac Toe: Code to Win</title>
				<meta name='description' content='Tic Tac Toe - Code to Win is a learning frontend project combining React, TypeScript, Vite and MUI components.' />
				<meta property='og:title' content='Privacy Policy | Tic Tac Toe - Code to Win' />
				<meta property='og:type' content='website' />
				<meta property='og:description' content='Tic Tac Toe - Code to Win is a learning frontend project combining React, TypeScript, Vite and MUI components.' />
				<meta property='og:image' content='/src/assets/images/tictactoe-fb.png' />
				<meta property='og:url' content='https://tic-tac-toe.games' />
				<meta name='robots' content='noindex,nofollow' />
			</Helmet>
			<Typography variant= 'h2' fontSize= {{xs:'2.5rem', md:'4.5rem'}} textAlign= 'center' marginBottom= '1.5rem'> Privacy Policy</Typography>
			<Typography variant= 'body1'>
				This Privacy Policy outlines how Appfinity Piotr Chwaleba ("we," "our," or "us") collects, uses, 
				and safeguards the personal information of users ("you" or "your") 
				who engage with our web application, specifically the Tic Tac Toe: Code to Win ("the App"). 
				We value your privacy and are committed to protecting your personal information. 
				By using the App, you agree to the terms outlined in this Privacy Policy.<br/><br/>

				<b>Information We Collect</b><br/>
				We may collect the following types of information from users:
				<li>
					<b>Personal Information:</b> We do not collect any personally identifiable information such as your name, 
					email address, or contact information.
				</li>
				<li>
					<b>Usage Data: </b> We may collect non-personal, aggregated information about your interactions with the App, 
					such as your game moves, win/loss records, and session duration. This data helps us improve the App's 
					functionality and user experience.
				</li><br/><br/>

				<b>Cookies and Tracking Technologies</b><br/>
				We may use cookies and similar tracking technologies to enhance your experience with the App. 
				Cookies are small files stored on your device that help us analyze usage patterns and provide personalized content. 
				You can modify your browser settings to disable cookies, but this may affect certain features of the App.<br/><br/>

				<b>How We Use Your Information</b><br/>
				The information we collect is used for the following purposes:

					<li>
						<b>Improvement of Services:</b> We use usage data to analyze how users interact with the App and identify areas 
						for improvement, such as enhancing gameplay mechanics and optimizing user interface elements.
					</li>
					<li>
						<b>Analytics: </b> We may use aggregated and anonymized data for analytical purposes, which helps us understand 
						user preferences, popular game strategies, and overall usage patterns.
					</li>
				<br/><br/>

				<b>Data Security</b><br/>
				We prioritize the security of your information and take reasonable measures to protect it. However, no method 
				of transmission over the internet or electronic storage is completely secure, and we cannot guarantee the absolute 
				security of your data.<br/><br/>

				<b>Third-Party Services</b><br/>
				The App may include links to third-party websites or services. We are not responsible for the privacy practices 
				or content of these third parties. We encourage you to review the privacy policies of any third-party services 
				you access through the App.<br/><br/>

				<b>Children's Privacy</b><br/>
				The App is not intended for use by individuals under the age of 13. We do not knowingly collect personal information 
				from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, 
				please contact us, and we will take steps to remove that information from our systems.<br/><br/>

				<b>Changes to Privacy Policy</b><br/>
				We reserve the right to update this Privacy Policy from time to time. Any changes will be posted on this page, 
				and the date of the last revision will be indicated at the top.<br/><br/>

				<b>Contact Us</b><br/>
				If you have any questions, concerns, or requests regarding your privacy or this Privacy Policy, 
				please contact us at <Link href='mailto:contact@appfinity.pl'>contact@appfinity.pl</Link>.<br/><br/>

		</Typography>
		</Box>
	)
}