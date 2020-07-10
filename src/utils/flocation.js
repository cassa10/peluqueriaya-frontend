const flocation = (targetUrl, afterLoginUrl) => ({
  pathname: targetUrl,
  state: { afterLoginUrl },
});

export default flocation;
