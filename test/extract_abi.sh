# Extract typescript declarations from ABIs JSON files

# Arguments:
#    variadic number of arguments are input json files
#    last argument is the output directory
#
# Example:
#    extract_abi.sh abi*.json ./

for f in ${@:1:$#-1}; do
    basename=${f##*/}
    name=${basename%.*}
    echo -E "declare const abi: $(cat $f) as const; export default abi;" > ${@: -1}/${name}.d.ts
done;
