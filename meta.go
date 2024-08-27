package main

import (
	"os"

	"gopkg.in/yaml.v2"
)

type Meta struct {
	Name   string      `yaml:"name"`
	Events []MetaEvent `yaml:"events"`
}

type MetaEvent struct {
	Type string  `yaml:"type"`
	GPX  string  `yaml:"gpx"`
	Name string  `yaml:"name"`
	Lat  float64 `yaml:"lat"`
	Lon  float64 `yaml:"lon"`
	Alt  int     `yaml:"alt"`
}

func parseMetaFile(file_path string) (*Meta, error) {
	data, err := os.ReadFile(file_path)
	if err != nil {
		return nil, err
	}

	var meta Meta

	err = yaml.Unmarshal(data, &meta)
	if err != nil {
		return nil, err
	}

	return &meta, nil
}
