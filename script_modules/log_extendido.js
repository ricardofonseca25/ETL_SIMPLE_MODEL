import util from 'node:util';

async function LOG_GRANDE(item_log) {
  console.log(
    util.inspect(item_log, {
      depth: null,
      maxArrayLength: null,
      colors: true
    })
  );
}

export default function patterns(data) {
  LOG_GRANDE(data);
}