# TODO - Fix server port / server link

- [ ] Inspect .env for malformed PORT value
- [x] Fix PORT handling to coerce malformed values like `3000 ,` into a clean integer

- [ ] Restart dev server and verify `Server is running on port ...` output
- [ ] Verify endpoint `http://localhost:<PORT>/api/health`
- [ ] If still failing, check if another process is occupying the port and inspect server start logs

