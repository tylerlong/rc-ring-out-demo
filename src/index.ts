import RingCentral from '@rc-ex/core';
import waitFor from 'wait-for-async';

const rc = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER_URL,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});

const main = async () => {
  await rc.authorize({
    username: process.env.RINGCENTRAL_USERNAME!,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password: process.env.RINGCENTRAL_PASSWORD!,
  });

  const r = await rc
    .restapi()
    .account()
    .extension()
    .ringOut()
    .post({
      from: {
        phoneNumber: process.env.RINGCENTRAL_FROM_NUMBER, // driver
      },
      to: {
        phoneNumber: process.env.RINGCENTRAL_TO_NUMBER, // customer
      },
      callerId: {
        phoneNumber: process.env.RINGCENTRAL_DISPLAY_NUMBER, // number display to customer
      },
    });
  console.log(JSON.stringify(r, null, 2));

  await waitFor({interval: 1000000});
  await rc.revoke();
};

main();
