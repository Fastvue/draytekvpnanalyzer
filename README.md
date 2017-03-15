## Synopsis

Simple tool to roll through your Draytek Vigor 3900 logs looking for VPN/SSLTunnel UP/DOWN messages, and output a list of the users who logged in, when they logged in, and how long they were logged in for.

## Usage

This utility requires NodeJS (https://nodejs.org/)

Use it from the command line by running `node draytekvpnanalyzer.js (path-to-log-file)`

It looks in the log for entries like this:

```
<137>Jan 01 09:00:00 Vigor3900: [H2L][UP][SSLTunnel][@Username]
<137>Jan 01 10:30:00 Vigor3900: [H2L][DOWN][SSLTunnel][@Username]
```

And outputs them as this:

```
Jan 01 09:00:00          Username     01:30:00
```

## License

ISC License

Copyright (c) 2017, Fastvue Inc.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
