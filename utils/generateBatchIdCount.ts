export default function generateBatchIdCount(batches: string[]) {
  const count: Record<string, number> = {};
  for (const batch of batches) {
    if (!batch) continue;
    if (!!count[batch]) count[batch]++;
    else count[batch] = 1;
  }
  return count;
}
