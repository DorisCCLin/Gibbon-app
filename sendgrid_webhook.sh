function localtunnel {
  lt -s qrklhafl2434kjkl --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done