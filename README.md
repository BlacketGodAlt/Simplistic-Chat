# Simplistic Chat!

One of the most simplistic multi-person chats. This chat uses a JavaScript frontend and a Node.js backend. (NOTE: This chat is currently in BETA testing. Expect bugs!)
### Steps to run:
#### Github Codespaces
1. Create a new codespace on main.
2. Run `node server.js` and click **Make Public** on the popup.
3. Navigate to the **Ports** tab, right click the link, and click **Open in Browser** to launch the chat.

#### Other Options
##### Koyeb
Koyeb's **Deploy** button is currently broken and won't select the repository if the button is clicked, so...
1. Login to Koyeb, go to **Overview**, select **Web Service**, and choose **Github**.
2. Scroll down to **Public Repository** and copy and paste this link: `https://github.com/BlacketGodAlt/Simplistic-Chat`.
3. Select **Free** plan if you can.
4. On the **Review & Deploy** page, select **Builder**.
5. Set the **Build** command to `npm install` and the **Run** command to `node server.js`. Then, scroll down to **Ports** and set the port to `3000`.
6. Click **Deploy**.
7. Congratulations! Koyeb will handle the rest.
