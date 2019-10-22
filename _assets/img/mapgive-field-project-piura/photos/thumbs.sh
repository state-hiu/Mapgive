#!/bin/bash
for i in *.JPG
do
convert -thumbnail 300 $i thumbs/$i
done
